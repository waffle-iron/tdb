Classificacoes = new Mongo.Collection('Classificacoes');

Schema.Classificacoes = new SimpleSchema({
  cargoId:{
    type:String
  },
  senioridadeId:{
    type: String,
  },
  versaoId:{
    type: String,
    optional:true,
    autoform:{
      omit:true
    }
  },
  atribuicoes:{
    type: [String],
    label: "Atribuições",
  },
  conhecimentos:{
    type: [String]
  },
  formacao:{
    type: [String],
    label:"Formação"
  },
  experiencia:{
    type: [String],
    label:"Experiência"
  },
  
})

Classificacoes.attachSchema(Schema.Classificacoes);
Classificacoes.attachBehaviour('timestampable');

/*                                      */
/*                HOOKS                 */
/*                                      */

if (Meteor.isServer){
  Classificacoes.after.update(function (userId, doc, fieldNames, modifier, options){
    console.log(fieldNames);
    console.log(_.intersection(fieldNames,['atribuicoes','formacao','experiencia','conhecimentos']));

    if(_.intersection(fieldNames,['atribuicoes','formacao','experiencia','conhecimentos']).length && !modifier.$set.versaoId){
      var versaoId = Backups.insert({
        model: "Classificacoes",
        docId: doc._id,
        userId: userId,
        doc: doc
      });

      Classificacoes.update({_id: doc._id},{$set: {versaoId:versaoId}});
    }
  });


  Classificacoes.before.insert(function(userId, doc){
    var versaoId = Backups.insert({
      model: "Classificacoes",
      docId: doc._id,
      userId: userId,
      doc: doc
    });

    doc.versaoId = versaoId;
  });
}




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
  },
  backups:function(){
    return Backups.find({'docId': this._id},{sort: {criadoEm: -1}});
  }
});

