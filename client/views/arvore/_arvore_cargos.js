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
				var items = {
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
							FlowRouter.go('cargos.view',{id: $node.id})
						}                  
					}
				};
				console.log($node);
				return items;
			}
		},  
		core:{
			check_callback:function(operation,node,parent,position,more){
				return true;
			},    
			data: function(node,cb){
				console.log("running", node);
				treeCargos.jstree("open_node", node);
				var areaSelecionada = Session.get('areaSelecionada');
				var areasDescendentes = _.pluck(Areas.find({caminho:areaSelecionada}).fetch(),'_id');
				var areasEmContexto = _.union(areaSelecionada,areasDescendentes);

				var cargos = Cargos.find({areaId: {$in: areasEmContexto}},{sort:{carreiraId:1}});

				var nodes = cargos.map(function(cargo){
					var carreira = cargo.carreira();
					var estrutura = carreira.estrutura;

	        		
	        		var carreira = cargo.carreira();

	        		var children = _.map(estrutura,function(senioridadeId){
	        			var senioridade = Senioridades.findOne({_id: senioridadeId});
	        			var classificacao = Classificacoes.findOne({cargoId: cargo._id, senioridadeId: senioridadeId});
	        			
	        			var cor = (classificacao)?'text-black': 'text-grey';
	        			
			        	return {
			        		text: senioridade.nome,
			        		icon: "/img/senioridades/16/" + senioridade.avatar,
			        		li_attr:{'class':cor}
			        	}
	        		});

	        		var cor = (cargo.areaId==areaSelecionada)? 'text-black' : 'text-grey'
			        return {
			        	li_attr:{'class':cor},
			        	text: cargo.nome,
			        	id: cargo._id,
			        	icon: "/img/carreiras/16/" + carreira.avatar,
			        	children:children,
			        	type: 'cargo'
			        }
    			})

				cb(nodes);
			}
		}
	}).bind('rename_node.jstree',function(e,obj){
		console.log("rename");
		var node = obj.node;
		var cargo = Cargos.findOne({_id: obj.node.id});

		if (cargo.nome != obj.text){
			Cargos.update({_id: obj.node.id},{$set:{nome:obj.text}},{reactive:false});
		}
	}).on('loaded.jstree', function() {
		$(this).jstree('open_all');
	})
})

