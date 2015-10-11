var treeAreas;

Template._arvoreAreas.events({
	'keyup #procurar-areas': function(e,tmpl){
		var texto = $(e.target).val();
		tmpl.$('#jsTreeAreas').jstree(true).search(texto);
	},
})


Template._arvoreAreas.onRendered(function(){
	treeAreas = this.$('#jsTreeAreas');

	treeAreas.jstree({
		themes:{
			stripes:true,
			dots:false
		},
		plugins:['search','wholerow','contextmenu','state','dnd'],
		search:{
			fuzzy:false
		},    
		state : { 'key' : 'jsTreeAreas' },
		contextmenu:{
			items: function($node) {
				var tree = treeAreas.jstree(true);
				return {
					renomear: {
						separator_before: false,
						separator_after: false,
						label: "Renomear",
						action: function (obj) { 
							tree.edit($node);
						}
					},                         
					remover: {
						separator_before: false,
						separator_after: false,
						label: "Deletar",
						action: function (obj) { 
							tree.delete_node($node);
						}
					},
					ver: {
						separator_before: false,
						separator_after: false,
						label: "Ver",
						action: function (obj) { 
							console.log($node);
							FlowRouter.go('areas.view',{id: $node.id})
						}                  
					}
				};
			}
		},
		core: {
			check_callback:function(operation,node,parent,position,more){
				if (operation=='move_node'){
					if (parent.id=='#') return true;
					return (node.data.tipo>parent.data.tipo);
				}
				return true;
			},
			data: function (node, cb) {
				Tracker.nonreactive(function(){
					var areas = [];
					if(node.id === '#') {
						areas = Areas.find({paiId:null});
					}else{
						areas = Areas.find({paiId:node.id});
						var esta = Areas.findOne({_id: node.id});
					}

					var nodes = areas.map(function(area){
						var children = !!Areas.findOne({paiId: area._id});
						return {
							text: area.nome,
							id: area._id,
							children: children,
							icon:"fa fa-database",
							data:{
								tipo: area.tipo
							}
						}
					});
					cb(nodes);          
				})
			}	
		}
	}).on("select_node.jstree",function (e,data){
		Session.set('areaSelecionada',data.node.id);
	}).on('loaded.jstree', function() {
		$(this).jstree('open_all');
	}).bind('rename_node.jstree',function(e,obj){
		var node = obj.node;
		console.log(e);
		console.log(obj);
		var area = Areas.findOne({_id: obj.node.id});

		if (area.nome != obj.text){
			Areas.update({_id: obj.node.id},{$set:{nome:obj.text}},{reactive:false});
		}
	}).bind('move_node.jstree',function(e,obj){
		console.log(e);
		console.log(obj);

		var area = Areas.findOne({_id: obj.node.id});

		if (area.paiId != obj.parent){
			var novoPai;
			novoPai = (obj.parent=="#")? '' : obj.parent;
			Areas.update({_id: obj.node.id},{$set:{paiId:novoPai}});
		}
	});



	//TODO_-----------------------------
	Areas.find().observeChanges({
		changed:function(id, fields){
		  if (fields.nome){
		    treeAreas.jstree(true).rename_node(id,fields.nome);
		  }
		  if (fields.paiId){
		    treeAreas.jstree(true).move_node(id,fields.paiId,"last");
		  }
		}
	})	
})