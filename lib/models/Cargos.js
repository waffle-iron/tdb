Cargos = new Mongo.Collection('Cargos');

/*                                      */
/*                SCHEMA                */
/*                                      */

Schema.Cargos = new SimpleSchema({
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
    /*
    classificacoes:{
      type: [Schema.Classificacoes]
    },
    */
    
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
Cargos.attachSchema(Schema.Cargos);
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
  },
  carreira:function(){
    return Carreiras.findOne({_id:this.carreiraId});
  },
  area:function(){
    return Areas.findOne({_id: this.areaId});
  },
  classificacoes:function(){
    var classificacoes = Classificacoes.find({cargoId: this._id}).fetch();
    return _.sortBy(classificacoes,function(classificacao){
      return classificacao.senioridade().ordem;
    });        
  },
  senioridadesPossiveis: function(){
    var senioridades =  Carreiras.findOne({_id:this.carreiraId}).estrutura;
    return Senioridades.find({_id:{$in : senioridades }});
  }
});




/*                                      */
/*                CARREIRAS             */
/*                                      */

TabularTables.Cargos = new Tabular.Table({
  sub: new SubsManager(),
  name: "CargosList",
  collection: Cargos,
  extraFields: ['_id','areaId','carreiraId'],
    columns: [
    {
      title:"Nome",
      data: 'nome',
      tmpl: Meteor.isClient && Template.nameLink,
      width:"30%"
    },
    {
      title:"Carreira",
      data : 'carreira()',
      width:"20%",
      createdCell: Meteor.isClient && getLink, render: function(){}
    },   
    {
      title:"Área",
      data : 'area()',
      width:"20%",
      createdCell: Meteor.isClient && getLink, render: function(){}
    },      
    {
      title:"Ativo",
      data : 'ativo',
      render:function(val){ return formatarAtivo(val);},
      width:"10%"
    },
    {
      title:"Ações",
      tmpl: Meteor.isClient && Template.cargosAcoes,
      width:"20%"
    }
  ],
  bPaginate:true
});
