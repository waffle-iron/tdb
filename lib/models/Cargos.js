Cargos = new Mongo.Collection('Cargos');

/*                                      */
/*                SCHEMA                */
/*                                      */

Cargos.Schema = new SimpleSchema({
    nome: {
      type: String
    },
    carreiraId :{
      type: String,
      autoform: {
          type: "selectize",
          firstOption:"Selecione uma carreira",
          options: function () { return Carreiras.quickList();}
      }      
    },
    atribuicoes:{
      type: [String]
    },
    conhecimentos:{
      type: [String]
    },
    formacao:{
      type: [String]
    },
    experiencia:{
      type: [String]
    },     
    ativo:{
      type: Boolean
    },
    areaId:{
      type:String,
      autoform: {
          type: "selectize",
          firstOption:"Selecione uma área",
          options: function () { return Areas.quickList();}
      }        
    },
    classificacao:{
      type:String,
      allowedValues:['Sp','Pl','Sr','Jr','IV','III','II','I']
    }
});
Cargos.attachSchema(Cargos.Schema);
Cargos.attachBehaviour('timestampable');


/*                                      */
/*                EXTENSÕES             */
/*                                      */

Cargos.quickList = function() {
    return this.find().map(function (c) {
        return {label: c.nome, value: c._id};
    });
};

/*                                      */
/*                SEGURANÇA             */
/*                                      */

if (Meteor.isServer) {
  Cargos.allow({
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

Cargos.helpers({
  link:function(){
    return FlowRouter.path('cargos.view',{id:this._id});
  }
});


