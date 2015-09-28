Areas = new Mongo.Collection('Areas');

/*                                      */
/*                SCHEMA                */
/*                                      */

Areas.Schema = new SimpleSchema({
    nome: {
      type: String
    },
    tipo: {
      type: String,
      allowedValues : ['VP','DIR','GER','COORD'],
      autoform: {
        type: 'selectize',
        options:[
          {value:'VP',label:'Vice-presidência'},
          {value:'DIR',label:'Diretoria'},
          {value:'GER',label:'Gerência'},
          {value:'COORD',label:'Coordenação'}
        ],        
      }      
    },
    pai :{
      type: String
    },
    caminho: {
      type: [String]
    }
});
Areas.attachSchema(Areas.Schema);
Areas.attachBehaviour('timestampable');


/*                                      */
/*                EXTENSÕES             */
/*                                      */


Areas.quickList = function() {
    return this.find().map(function (c) {
        return {label: c.nome, value: c._id};
    });
};

/*                                      */
/*                SEGURANÇA             */
/*                                      */

if (Meteor.isServer) {
  Areas.allow({
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

Areas.helpers({
  link:function(){
    return FlowRouter.path('areas.view',{id:this._id});
  }
});


