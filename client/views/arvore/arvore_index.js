globalDep = new Tracker.Dependency();



Template.areas.onRendered(function(){
  
  var treeCargos = this.$('#jsTreeCargos');
  treeCargos.jstree({
  themes:{
    stripes:true,
    dots:false
  },
  plugins:['search','wholerow','contextmenu','state','dnd'],
  state : { 'key' : 'jsTreeCargos' },
  contextmenu:{
    items: function($node) {
        var tree = treeCargos.jstree(true);
        return {
            Rename: {
                separator_before: false,
                separator_after: false,
                label: "Renomear",
                action: function (obj) { 
                    tree.edit($node);
                }
            },                         
            Remove: {
                separator_before: false,
                separator_after: false,
                label: "Deletar",
                action: function (obj) { 
                    tree.delete_node($node);
                }
            },
            Ver: {
                separator_before: false,
                separator_after: false,
                label: "Ver",
                action: function (obj) { 
                    console.log($node);
                    FlowRouter.go('cargos.view',{id: $node.id})
                }                  
            }
        };
    }
  },  
  core:{
    check_callback:function(operation,node,parent,position,more){
      return true;
    },    
    data: function(node,cb){
      globalDep.depend();

      var areaSelecionada = Session.get('areaSelecionada');
      var areasDescendentes = _.pluck(Areas.find({caminho:areaSelecionada}).fetch(),'_id');
      var areasEmContexto = _.union(areaSelecionada,areasDescendentes);


      var cargos = Cargos.find({areaId: {$in: areasEmContexto}});
      var nodes = cargos.map(function(cargo){
        //var children = Boolean(cargo.classificacoes.length);
        var classificacoes = Classificacoes.find({cargoId: cargo._id}).fetch();

        var children = _.map(classificacoes,function(classificacao){
          var senioridade = Senioridades.findOne({_id: classificacao.senioridadeId});

          return {
            text: senioridade.nome,
            icon: senioridade.icone
          }
        });

        return {
          text: cargo.nome,
          id: cargo._id,
          icon: "fa fa-briefcase",
          children:children
        }
      })

      cb(nodes);
        //sconsole.log("aqui!");
      }
    }
  })


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