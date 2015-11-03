Carreiras = new Mongo.Collection('Carreiras');

/*                                      */
/*                SCHEMA                */
/*                                      */

Schema.Carreiras = new SimpleSchema({
    nome: {
      type: String
    },
    grade:{
      type: Number
    },
    gradeHorizontal:{
      type: Number
    },
    cor:{
      type: String,
      autoform: {
        type: "bootstrap-colorpicker"
      }       
    },
    coordenador:{
      type: Boolean,
      defaultValue: false
    },
    avatar:{
      type: String
    },
    estrutura:{
      type: [String],
      optional:true,
      autoform:{
        type: 'selectize',
        multiple:true,
        options: function(){
          return Senioridades.quickList({});
        }
      }

    }
});
Carreiras.attachSchema(Schema.Carreiras);
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
      width:"35%"
    },
    {
      title:"Grade",
      data : 'grade',
      width:"10%"
    },
    {
      title:"Grade Horizontal",
      data : 'gradeHorizontal',
      width:"10%"
    },    
    { 
      title:"Cor",
      data : 'cor',
      width:"10%",
      render:function(val){
        return '<span style="color:' + val + '">' + val + '</span>';
      }
    }, 
    { 
      title:"Estrutura",
      data : 'estrutura',
      width:"15%",
      render:function(val){
        /*
        _.map(vals,function(val){
          return Senioridades.findOne({_id:})
        })*/
        val = val || [];
        var senioridades = Senioridades.find({_id:{$in:val}},{sort:{ordem:1}}).fetch();
        var arr = _.pluck(senioridades, 'nome');
        return arr.join(', ');
      }
    },          
    {
      title:"Ações",
      tmpl: Meteor.isClient && Template.carreirasAcoes,
      width:"20%"
    }
  ],
  bPaginate:true
});

