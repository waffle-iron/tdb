Areas = new Mongo.Collection('Areas');
const TIPO_VP = 1;
const TIPO_DIR = 2;
const TIPO_GER = 3;
const TIPO_COORD = 4;

/*                                      */
/*                SCHEMA                */
/*                                      */

Schema.Areas = new SimpleSchema({
  nome: {
    type: String,
  },
  tipo: {
    type: Number,
    autoform: {
      type: 'selectize',
      firstOption: 'Selectione um tipo',
      options: [{
        value: 1,
        label: 'Vice-presidência',
      }, {
        value: 2,
        label: 'Diretoria',
      }, {
        value: 3,
        label: 'Gerência',
      }, {
        value: 4,
        label: 'Coordenação',
      }],
    },
  },
  paiId: {
    type: String,
    optional: true,
    custom() {
      let shouldBeRequired = this.field('tipo').value !== TIPO_VP;

      if (shouldBeRequired) {
        // inserts
        if (!this.operator) {
          if (!this.isSet || this.value === null || this.value === '') return 'required';
        }else if (this.isSet) {
          if (this.operator === '$set' && this.value === null || this.value === '') return 'required';
          if (this.operator === '$unset') return 'required';
          if (this.operator === '$rename') return 'required';
        }
      }
    },
    autoform: {
      type: 'universe-select',
      firstOption: 'Selecione uma área',
      options: function() {
        let tipo = AutoForm.getFieldValue('tipo');
        return Areas.quickList({
          tipo: {
            $lt: tipo,
          },
        });
      },
    },
  },
  ativo: {
    type: Number,
    autoform: {
      type: 'select-radio-inline',
      firstOption: 'Selecione uma opção',
      options: [{
        value: 1,
        label: 'Sim',
      }, {
        value: 0,
        label: 'Não',
      }],
    },
  },

  caminho: {
    type: [String],
    optional: true,
    autoform: {
      omit: true,
    },
  },
});
Areas.attachSchema(Schema.Areas);
Areas.attachBehaviour('timestampable');


/*                                      */
/*                EXTENSÕES             */
/*                                      */

Areas.quickList = function(query) {
  return this.find(query).map(function(c) {
    return {
      label: c.nome,
      value: c._id
    };
  });
};

/*                                      */
/*                SEGURANÇA             */
/*                                      */

if (Meteor.isServer) {
  Areas.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return true;
    },
    remove: function() {
      return true;
    }
  });
}


if (Meteor.isServer) {
  Areas.before.insert(function(userId, doc) {
    doc.caminho = this.transform().defineCaminho();
  });

  Areas.after.update(function(userId, doc, fieldNames) {
    let docAtual = this.transform();

    if (_.indexOf(fieldNames, 'paiId') !== -1) {
      Areas.update({
        _id: doc._id
      }, {
        $set: {
          caminho: docAtual.defineCaminho()
        }
      });
    }


    if (_.indexOf(fieldNames, 'caminho') !== -1) {
      docAtual.atualizaCaminhoFilhos();
    }
  });
}


/*                                      */
/*                HELPERS               */
/*                                      */

Areas.helpers({
  link: function() {
    return FlowRouter.path('areas.view', {
      id: this._id
    });
  },
  pai: function() {
    return Areas.findOne({
      _id: this.paiId
    });
  },
  defineCaminho: function() {
    let caminho = [];
    if (this.paiId) {
      let pai = Areas.findOne({
        _id: this.paiId
      });
      caminho = pai.caminho.slice();
      caminho.push(pai._id);
    }

    return caminho;
  },
  atualizaCaminhoFilhos: function() {
    let children = Areas.find({
      paiId: this._id
    }).fetch();
    _.each(children, function(child) {
      let novoCaminho = child.defineCaminho();

      Areas.update({
        _id: child._id
      }, {
        $set: {
          caminho: novoCaminho
        }
      });
    });
  },
  filhos: function() {
    return Areas.find({
      paiId: this._id
    }).fetch();
  },
  totalSubareas: function() {
    return Areas.find({
      caminho: this._id
    }).count();
  },
  totalCargos: function() {
    let subareas = _.pluck(Areas.find({
      caminho: this._id
    }).fetch(), '_id');
    return Cargos.find({
      areaId: {
        $in: _.union(subareas, this._id)
      }
    }).count();
  }
});


/*                                      */
/*                CARREIRAS             */
/*                                      */

TabularTables.Areas = new Tabular.Table({
  name: 'AreasList',
  collection: Areas,
  sub: new SubsManager(),
  pub: 'tabularAreasList',
  autoWidth: false,
  responsive: true,
  stateSave: true,
  extraFields: ['_id', 'paiId'],
  columns: [{
    title: 'Nome',
    data: 'nome',
    width: '30%'
  }, {
    title: 'Tipo',
    data: 'tipo',
    render: function(val) {
      return formatarAreasTipo(val);
    },
    width: '20%'
  }, {
    title: 'Pai',
    data: 'pai()',
    width: '30%',
    render(val) {
      return val && val.nome;
    }
  }, {
    title: 'Ativo',
    data: 'ativo',
    render: function(val) {
      return formatarAtivo(val);
    },
    width: '10%'
  }, {
    title: 'Ações',
    tmpl: Meteor.isClient && Template.areasAcoes,
    width: '10%'
  }],
  bPaginate: true
});
