/*
senioridades = [
  {nome: "Sp", ordem: 0},
  {nome: "Sr", ordem: 1},
  {nome: "Pl", ordem: 2},
  {nome: "Jr", ordem: 3},
  {nome: "IV", ordem: 4},
  {nome: "III", ordem: 5},
  {nome: "II", ordem: 6},
  {nome: "I", ordem: 7},
]
*/
Senioridades = new Mongo.Collection('Senioridades');

/*                                      */
/*                SCHEMA                */
/*                                      */
Schema.Senioridades = new SimpleSchema({
    nome: {
      type: String
    },
    ordem :{
      type: Number  
    },
    avatar: {
      type: String
    },
    abreviacao:{
      type:String,
      autoform:{
        label:"Abreviação"
      }
    }
});
Senioridades.attachSchema(Schema.Senioridades);
//Senioridades.attachBehaviour('timestampable');


/*                                      */
/*                EXTENSÕES             */
/*                                      */

Senioridades.quickList = function(selector) {
    selector = selector || {};
    return this.find(selector).map(function (c) {
        return {label: c.nome, value: c._id};
    });
};

/*                                      */
/*                SEGURANÇA             */
/*                                      */

if (Meteor.isServer) {
  Senioridades.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}

/*                                      */
/*                HELPERS               */
/*                                      */

Senioridades.helpers({
  link:function(){
    return FlowRouter.path('senioridade.view',{id:this._id});
  }
});


TabularTables.Senioridades = new Tabular.Table({
  sub: new SubsManager(),
  name: "SenioridadesList",
  collection: Senioridades,
  extraFields: ['_id','profile','info.setorId','info.cargoId'],
    columns: [
    {
      title:"Nome",
      data: 'nome',
      width:"50%"
    },
    {
      title:"Ordem",
      data : 'ordem',
      width:"40%"
    },       
    {
      title:"Ações",
      tmpl: Meteor.isClient && Template.senioridadesAcoes,
      width:"10%"
    }
  ],
  bPaginate:true
});

