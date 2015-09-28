Carreiras = new Mongo.Collection('Carreiras');

/*                                      */
/*                SCHEMA                */
/*                                      */

Carreiras.Schema = new SimpleSchema({
    nome: {
      type: String
    },
    grade:{
      type: Number
    },
    cor:{
      type: String,
      autoform: {
        type: "bootstrap-colorpicker"
      }       
    },
    estrutura:{
      type: [String],
      autoform:{
        type: 'universe-select',
        multiple:true,
        options: function(){
          return [
            {value: 'Sp', label: 'Especialista'},
            {value: 'Sr', label: 'Senior'},
            {value: 'Pl', label: 'Pleno'},
            {value: 'Jr', label: 'Junior'},
            {value: 'IV', label: 'IV'},
            {value: 'III', label: 'III'},
            {value: 'II', label: 'II'},
            {value: 'I', label: 'I'},
          ]
        }
      }

    }
});
Carreiras.attachSchema(Carreiras.Schema);
Carreiras.attachBehaviour('timestampable');


/*                                      */
/*                EXTENSÕES             */
/*                                      */

Carreiras.quickList = function() {
    return this.find().map(function (c) {
        return {label: c.nome, value: c._id};
    });
};

/*                                      */
/*                SEGURANÇA             */
/*                                      */

if (Meteor.isServer) {
  Carreiras.allow({
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

Carreiras.helpers({
  link:function(){
    return FlowRouter.path('carreiras.view',{id:this._id});
  }
});


/*                                      */
/*                CARREIRAS             */
/*                                      */

TabularTables.Carreiras = new Tabular.Table({
  sub: new SubsManager(),
  name: "CarreirasList",
  collection: Carreiras,
  extraFields: ['_id','profile','info.setorId','info.cargoId'],
    columns: [
    {
      title:"Nome",
      data: 'nome',
      width:"40%"
    },
    {
      title:"Grade",
      data : 'grade',
      width:"20%"
    },
    {
      title:"Cor",
      data : 'cor',
      width:"20%"
    },      
    {
      title:"Ações",
      tmpl: Meteor.isClient && Template.usersAcoes,
      width:"20%"
    }
  ],
  bPaginate:true
});

