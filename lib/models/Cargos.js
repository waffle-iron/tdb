Cargos = new Mongo.Collection('Cargos');

/*                                      */
/*                SCHEMA                */
/*                                      */

Cargos.schema = new SimpleSchema({
  nome: {
    type: String,
  },
  carreiraId: {
    type: String,
    autoform: {
      type: 'selectize',
      firstOption: 'Selecione uma carreira',
      options: function() {
        return Carreiras.quickList();
      },
    },
  },
  ativo: {
    type: Boolean,
  },
  areaId: {
    type: String,
    autoform: {
      type: 'selectize',
      firstOption: 'Selecione uma área',
      options: function() {
        return Areas.quickList({});
      },
    },
  },
});
Cargos.attachSchema(Cargos.schema);
Cargos.attachBehaviour('timestampable');


/*                                      */
/*                EXTENSÕES             */
/*                                      */

Cargos.quickList = function() {
  return this.find().map(function(c) {
    return {
      label: c.nome,
      value: c._id,
    };
  });
};

/*                                      */
/*                SEGURANÇA             */
/*                                      */

if (Meteor.isServer) {
  Cargos.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return true;
    },
    remove: function() {
      return true;
    },
  });
}

/*                                      */
/*                HELPERS               */
/*                                      */

Cargos.helpers({
  link: function() {
    return FlowRouter.path('cargos.view', {
      id: this._id
    });
  },
  carreira: function() {
    return Carreiras.findOne({
      _id: this.carreiraId
    });
  },
  area: function() {
    return Areas.findOne({
      _id: this.areaId
    });
  },
  classificacoes: function() {
    let classificacoes = Classificacoes.find({
      cargoId: this._id
    }).fetch();
    return _.sortBy(classificacoes, function(classificacao) {
      return classificacao.senioridade().ordem;
    });
  },
  senioridadesPossiveis: function() {
    let senioridades = Carreiras.findOne({
      _id: this.carreiraId
    }).estrutura;
    return Senioridades.find({
      _id: {
        $in: senioridades || []
      }
    }, {
      sort: {
        ordem: 1
      }
    });
  }
});

/*                                      */
/*                DATATABLE             */
/*                                      */

TabularTables.Cargos = new Tabular.Table({
  name: 'CargosList',
  collection: Cargos,
  sub: new SubsManager(),
  pub: 'tabular_CargosList',
  autoWidth: false,
  responsive: true,
  stateSave: true,
  extraFields: ['_id', 'areaId', 'carreiraId'],
  columns: [{
    title: 'Nome',
    data: 'nome',
    tmpl: Meteor.isClient && Template.nameLink,
    width: '30%'
  }, {
    title: 'Carreira',
    data: 'carreira()',
    width: '20%',
    render(val) {
      return val && val.nome;
    }
  }, {
    title: 'Área',
    data: 'area()',
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
    tmpl: Meteor.isClient && Template.cargosAcoes,
    width: '10%'
  }],
  bPaginate: true
});
