Template._arvoreCargos.events({
	'keyup #procurar-cargos': function(e,tmpl){
		var texto = $(e.target).val();

		tmpl.$('#jsTreeCargos').jstree(true).search(texto);
	}  
})

Template._arvoreCargos.onRendered(function(){
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
					renomear: {
						label: "Renomear",
						action: function (obj) { 
							tree.edit($node);
						}
					},                         
					remover: {
						label: "Deletar",
						action: function (obj) { 
							tree.delete_node($node);
						}
					},
					ver: {
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
				var areaSelecionada = Session.get('areaSelecionada');
				var areasDescendentes = _.pluck(Areas.find({caminho:areaSelecionada}).fetch(),'_id');
				var areasEmContexto = _.union(areaSelecionada,areasDescendentes);

				var cargos = Cargos.find({areaId: {$in: areasEmContexto}});
				var nodes = cargos.map(function(cargo){
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
			}
		}
	})	
})

