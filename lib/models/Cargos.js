Cargos = new Mongo.Collection('Cargos');

/*                                      */
/*                SCHEMA                */
/*                                      */
Schema.CargosInformacoes = new SimpleSchema({
  classificacao:{
    type: String,
    autoform:{
      type : "universe-select",
      options: function(){        
        
        var carreiraId = AutoForm.getFieldValue('carreiraId');
        if (carreiraId){
          var carreira = Carreiras.findOne({_id:carreiraId});  
          

          return Senioridades.quickList({_id:{$in: carreira.estrutura}});

        }
        

      }        
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
})
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
    /*
    classificacao:{
      type:String,
      autoform:{
        type : "universe-select",
        options: function(){        
          var carreiraId = AutoForm.getFieldValue('carreiraId');
          if (carreiraId){
            var carreira = Carreiras.findOne({_id:carreiraId});  
            console.log(carreira);
            return carreira.estrutura.map(function(estrutura){
              return {value: estrutura, label: estrutura}
            })
          }
        }        
      }
    },
    */
    classificacoes:{
      type: [Schema.CargosInformacoes]
    },

  
    ativo:{
      type: Boolean
    },
    areaId:{
      type:String,
      autoform: {
          type: "selectize",
          firstOption:"Selecione uma área",
          options: function () { 
            return Areas.quickList({});
          }
      }        
    }
});
Cargos.attachSchema(Cargos.Schema);
//Cargos.attachBehaviour('timestampable');


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


