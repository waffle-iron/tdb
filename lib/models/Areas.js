Areas = new Mongo.Collection('Areas');

/*                                      */
/*                SCHEMA                */
/*                                      */

Schema.Areas = new SimpleSchema({
    nome: {
      type: String
    },
    tipo: {
      type: Number,
      autoform: {
        type: 'selectize',
        options:[
          {value:1,label:'Vice-presidência'},
          {value:2,label:'Diretoria'},
          {value:3,label:'Gerência'},
          {value:4,label:'Coordenação'}
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
Areas.attachSchema(Schema.Areas);
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
  doc.caminho = this.transform().defineCaminho();
})

Areas.after.update(function(userId,doc,fieldNames){
  //debugger;
  var docAtual = this.transform();
  console.log(fieldNames);
  console.log(docAtual);


  if (_.indexOf(fieldNames,'paiId')!=-1){
    Areas.update({_id: doc._id},{$set:{caminho:docAtual.defineCaminho()}})
    //docAtual.atualizaCaminhoFilhos();
  }


  if (_.indexOf(fieldNames,'caminho')!=-1){
    docAtual.atualizaCaminhoFilhos();
  }
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
  },
  defineCaminho:function(){
    if (this.paiId){
      var pai = Areas.findOne({_id: this.paiId});
      var caminho = pai.caminho.slice();
      caminho.push(pai._id);
    }else{
      caminho = [];
    }

    return caminho;
  },
  atualizaCaminhoFilhos:function(){
    var children = Areas.find({paiId: this._id}).fetch();
    _.each(children,function(child){
      var novoCaminho = child.defineCaminho();

      Areas.update({_id: child._id},{$set:{caminho: novoCaminho}});
    })
  },
  filhos:function(){
    return Areas.find({paiId: this._id}).fetch();
  },
  totalSubareas:function(){
    return Areas.find({caminho:this._id}).count();
  },
  totalCargos:function(){
    var subareas = _.pluck(Areas.find({caminho:this._id}).fetch(),'_id');
    return Cargos.find({areaId: {$in: _.union(subareas,this._id)}}).count();
  }
});




/*                                      */
/*                CARREIRAS             */
/*                                      */

TabularTables.Areas = new Tabular.Table({
  sub: new SubsManager(),
  name: "AreasList",
  collection: Areas,
  extraFields: ['_id','paiId'],
    columns: [
    {
      title:"Nome",
      data: 'nome',
      width:"30%"
    },
    {
      title:"Tipo",
      data : 'tipo',
      render:function(val){ return formatarAreasTipo(val);},
      width:"20%"
    },    
    {
      title:"Pai",
      data : 'pai()',
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
      tmpl: Meteor.isClient && Template.areasAcoes,
      width:"20%"
    }
  ],
  bPaginate:true
});

