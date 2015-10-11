Classificacoes = new Mongo.Collection('Classificacoes');

Schema.Classificacoes = new SimpleSchema({
  cargoId:{
    type:String
  },
  senioridadeId:{
    type: String,
    /*
    autoform:{
      type : "universe-select",
      options: function(){        
        var carreiraId = AutoForm.getFieldValue('carreiraId');
        if (carreiraId){
          var carreira = Classificacoes.findOne({_id:carreiraId});  
          return Senioridades.quickList({_id:{$in: carreira.estrutura}});
        }
      }        
    }    
    */
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
  
})

Classificacoes.attachSchema(Schema.Classificacoes);
Classificacoes.attachBehaviour('timestampable');


/*                                      */
/*                EXTENSÕES             */
/*                                      */

Classificacoes.quickList = function() {
    return this.find().map(function (c) {
        return {label: c.nome, value: c._id};
    });
};

/*                                      */
/*                SEGURANÇA             */
/*                                      */

if (Meteor.isServer) {
  Classificacoes.allow({
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

Classificacoes.helpers({
  link:function(){
    return FlowRouter.path('Classificacoes.view',{id:this._id});
  },
  senioridade:function(){
    return Senioridades.findOne({_id:this.senioridadeId});
  },
  cargo:function(){
    return Cargos.findOne({_id: this.cargoId});
  }
});

