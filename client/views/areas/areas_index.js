globalDep = new Tracker.Dependency();

Template.areas.onRendered(function(){
  this.$('#jsTreeAreas').jstree({
  	themes:{
  		stripes:true,
  		dots:false
  	},
    core: {
      data: function (node, cb) {
        globalDep.depend();
        var docs = [];
        if(node.id === '#') {
          docs = Areas.find({paiId:null})
        }else{
          docs = Areas.find({paiId:node.id})
        }
        var nodes = docs.map(function(doc){
          var children = !!Areas.findOne({paiId: doc._id});
          return {
            text: doc.nome,
            id: doc._id,
            children: children
          }
        });
        cb(nodes);
     }
   }
 }).on("select_node.jstree",function (e,data){
   Session.set('nodeSelecionado',data.node.id);
 });
});


Template.areasAcoes.helpers({
	beforeRemove: function () {
    return function (collection, id) {
      var doc = collection.findOne(id);
      var object = this;
      alertify.confirm('Remover <b>' + doc.nome + '</b>?', function(){
       object.remove();
     });
    };
  }
})