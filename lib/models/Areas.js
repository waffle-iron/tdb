Areas = new Mongo.Collection('Areas');

/*                                      */
/*                SCHEMA                */
/*                                      */

Areas.Schema = new SimpleSchema({
    nome: {
      type: String
    },
    tipo: {
      type: Number,
      allowedValues : [1,2,3,4],
      autoform: {
        type: 'selectize',
        options:[
          {value:'1',label:'Vice-presidência'},
          {value:'2',label:'Diretoria'},
          {value:'3',label:'Gerência'},
          {value:'4',label:'Coordenação'}
        ],        
      }      
    },
    paiId :{
      type: String,
      optional:true,
      autoform:{
        type:'universe-select',
        options: function(){   
          
          var tipo = AutoForm.getFieldValue('tipo');
          /*
          if (tipo){
            var possivelPai = tipo - 1;
            console.log(possivelPai);
            return Areas.quickList({tipo:possivelPai});
          }
          */
          
          return Areas.quickList({tipo:{$lt:tipo}});
        } 
      }
    }, 
    caminho:{
      type: [String]
    },
    ativo:{
      type: Number,
      autoform: {
        type: 'select-radio-inline',     
        options: [
          {value:1, label:"Sim"},
          {value:0, label:"Não"}
        ]
      }      
      /*
      autoform: {
        type: 'selectize',
        options:[
          {value: true, label: 'Sim'},
          {value: false, label: 'Não'}
        ]
      } 
      */     
    },
    
    caminho: {
      type: [String],
      optional:true,
      autoform:{
        omit:true
      }
    }
});
Areas.attachSchema(Areas.Schema);
Areas.attachBehaviour('timestampable');


/*                                      */
/*                EXTENSÕES             */
/*                                      */

Areas.quickList = function(query) {
    return this.find(query).map(function (c) {
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
Areas.before.insert(function(userId,doc){
  var docAtual = this.transform();
  var caminho = [];
  while (docAtual.paiId){
    var pai = docAtual.pai();
    caminho.push(pai._id);
    docAtual = pai;
  }  
  doc.caminho = caminho;
})


/*                                      */
/*                HELPERS               */
/*                                      */

Areas.helpers({
  link:function(){
    return FlowRouter.path('areas.view',{id:this._id});
  },
  pai: function(){
    return Areas.findOne({_id: this.paiId})
  }
});


