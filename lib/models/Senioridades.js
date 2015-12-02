//  Sp
//  Sr
//  Pl
//  Jr
//  IV
//  III
//  II
//  I

Senioridades = new Mongo.Collection('Senioridades');

//
//                SCHEMA
//
Schema.Senioridades = new SimpleSchema({
  nome: {
    type: String
  },
  ordem: {
    type: Number
  },
  avatar: {
    type: String
  },
  abreviacao: {
    type: String,
    autoform: {
      label: 'Abreviação'
    }
  }
});
Senioridades.attachSchema(Schema.Senioridades);
Senioridades.attachBehaviour('timestampable');


//
//                EXTENSÕES
//

Senioridades.quickList = function(selector = {}) {
  return this.find(selector).map(function(c) {
    return {
      label: c.nome,
      value: c._id
    };
  });
};

//
//                SEGURANÇA
//

if (Meteor.isServer) {
  Senioridades.allow({
    insert() {
      return true;
    },
    update() {
      return true;
    },
    remove() {
      return true;
    }
  });
}

//
//                HELPERS
//

Senioridades.helpers({
  link() {
    return FlowRouter.path('senioridade.view', {
      id: this._id
    });
  }
});


//
//                DATATABLE
//
TabularTables.Senioridades = new Tabular.Table({
  name: 'SenioridadesList',
  collection: Senioridades,
  sub: new SubsManager(),
  pub: 'tabular_SenioridadesList',
  autoWidth: false,
  responsive: true,
  stateSave: true,
  extraFields: ['_id', 'profile', 'info.setorId', 'info.cargoId'],
  columns: [{
    title: 'Nome',
    data: 'nome',
    width: '50%'
  }, {
    title: 'Ordem',
    data: 'ordem',
    width: '40%'
  }, {
    title: 'Ações',
    tmpl: Meteor.isClient && Template.senioridadesAcoes,
    width: '10%'
  }],
  bPaginate: true
});
