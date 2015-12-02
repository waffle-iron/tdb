Carreiras = new Mongo.Collection('Carreiras');

/*                                      */
/*                SCHEMA                */
/*                                      */

Schema.Carreiras = new SimpleSchema({
  nome: {
    type: String
  },
  grade: {
    type: Number,
    autoform: {
      label: 'Grade vertical'
    }
  },
  gradeHorizontal: {
    type: Number,
    autoform: {
      label: 'Grade horizontal'
    }
  },
  cor: {
    type: String,
    autoform: {
      type: 'bootstrap-colorpicker'
    }
  },
  coordenador: {
    type: Boolean,
    defaultValue: false
  },
  avatar: {
    type: String
  },
  estrutura: {
    type: [String],
    optional: true,
    autoform: {
      type: 'selectize',
      firstOption: 'Selecione as senioridades',
      multiple: true,
      options: function() {
        return Senioridades.quickList({});
      }
    }

  }
});
Carreiras.attachSchema(Schema.Carreiras);
Carreiras.attachBehaviour('timestampable');


/*                                      */
/*                EXTENSÕES             */
/*                                      */

Carreiras.quickList = function() {
  return this.find().map(function(c) {
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
  Carreiras.allow({
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

/*                                      */
/*                HELPERS               */
/*                                      */

Carreiras.helpers({
  link: function() {
    return FlowRouter.path('carreiras.view', {
      id: this._id
    });
  }
});


/*                                      */
/*                CARREIRAS             */
/*                                      */

TabularTables.Carreiras = new Tabular.Table({
  name: 'CarreirasList',
  collection: Carreiras,
  sub: new SubsManager(),
  pub: 'tabular_CarreirasList',
  autoWidth: false,
  responsive: true,
  stateSave: true,
  extraFields: ['_id', 'profile', 'info.setorId', 'info.cargoId'],
  columns: [{
    title: 'Nome',
    data: 'nome',
    width: '30%'
  }, {
    title: 'Grade V.',
    data: 'grade',
    width: '10%'
  }, {
    title: 'Grade H.',
    data: 'gradeHorizontal',
    width: '10%'
  }, {
    title: 'Cor',
    data: 'cor',
    width: '10%',
    render: function(val) {
      return formatarCor(val);
    }
  }, {
    title: 'Estrutura',
    data: 'estrutura',
    width: '30%',
    render: function(val = []) {
      let senioridades = Senioridades.find({
        _id: {
          $in: val
        }
      }, {
        sort: {
          ordem: 1
        }
      }).fetch();
      return _.pluck(senioridades, 'nome').join(', ');
    }
  }, {
    title: 'Ações',
    tmpl: Meteor.isClient && Template.carreirasAcoes,
    width: '10%'
  }],
  bPaginate: true
});
