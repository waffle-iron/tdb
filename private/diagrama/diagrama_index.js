var matrizAreas = new ReactiveVar();
var matrizCargos = new ReactiveVar();
var mapaAreas = [];
var mapaCargos = [];
var cargosBounds = {};	

var constroiHierarquia = function(root){
	//debugger;

	var pushSeguroAreas = function(nivel,obj){
		if (!mapaAreas[nivel]) mapaAreas[nivel] = [];
		mapaAreas[nivel].push(obj);
	}

	var cargosDescendentes = function(raiz){
		var selector = (raiz)?{caminho: raiz}:{};
		//var areasDescendentes = _.pluck(Areas.find(selector).fetch(),'_id');

		var areasDescendentes = _.union(_.pluck(Areas.find(selector).fetch(),'_id'),raiz);
		//var n = 0;
		return _.reduce(areasDescendentes,function(memo,area){
			//debugger;
			deveriaTerFilho = Areas.findOne({paiId: area}) ? 0 : 1;

			var countCargos = Cargos.find({areaId:area}).count() || deveriaTerFilho;

			return memo + countCargos;
		},0);
		//return nCargosDescendentes = Cargos.find({areaId:{$in: _.union(raiz,areasDescendentes)}}).count() || 1;			
	}

	var pushSeguroCargos = function(x,y,obj){
		//if (!mapaCargos[x]) mapaCargos[x] = [];
		//mapaCargos[x][y] = obj;
		var obj = _.extend(obj,{
			x: x,
			y: y
		})
		mapaCargos.push(obj);
	}	

	var atualizaBoundsCargos = function(x,y){
		if (x > cargosBounds.x.max) cargosBounds.x.max = x;
		if (y > cargosBounds.y.max) cargosBounds.y.max = y;

		if (x < cargosBounds.x.min || cargosBounds.x.min===false) cargosBounds.x.min = x;
		if (y < cargosBounds.y.min || cargosBounds.y.min===false) cargosBounds.y.min = y;		
	}


	var calculaOffsetX = function(nivel){
		return _.reduce(mapaAreas[nivel],function(soma,area){
			return soma + area.colspan
		},0);
	}
	//adiciona area--------------
	var colspan = cargosDescendentes(root);

	if (root==null){
		pushSeguroAreas(0,{
			nome: "AES Eletropaulo",
			id: "#",
			colspan: colspan
		});
	}else{
		//debugger;
		var area = Areas.findOne({_id: root});
		var offsetX = calculaOffsetX(area.tipo);
		pushSeguroAreas(area.tipo, {
			nome: area.nome,
			id: area._id,
			colspan: colspan
		})
	}
	//-------------------------

	//adiciona cargos
	var cargos = _.sortBy(Cargos.find({areaId: root}).fetch(),function(cargo){
		return cargo.carreira().gradeHorizontal;
	});

	_.each(cargos,function(cargo, i){
		var carreira = cargo.carreira();
		_.each(carreira.estrutura, function(senioridadeId, j){
			var senioridade = Senioridades.findOne({_id: senioridadeId});
			var texto = (j==0)? carreira.nome:'';
			var cor = carreira.cor;
			var temPai = (j>0)?true:false;
			var x = offsetX+i;
			var y = carreira.grade + j;
			var classificacao = Classificacoes.findOne({cargoId: cargo._id,senioridadeId: senioridadeId});
			pushSeguroCargos(x, y,{
				cargoId: cargo._id,
				senioridadeId: senioridade,
				label: senioridade.nome,
				texto: carreira.nome,
				cor: cor,
				temPai: temPai,
				classificacao: classificacao
			});			
			atualizaBoundsCargos(x,y);
		})
	})
	//-------------------------


	//procura filhos e faz recursividade
	var filhos = Areas.find({paiId: root}).fetch();
	if (filhos.length){
		_.each(filhos, function(filho){
			constroiHierarquia(filho._id);
		});
	}else{
		//correcao de buraco
		var sobrinhos = Areas.find({tipo: area.tipo+1}).count()>0;
		
		if (sobrinhos){
			console.log(area.nome," tem sobrinhos");
			pushSeguroAreas(area.tipo+1,{
				id: null,
				nome: '',
				colspan: colspan
			})
		}
	}
	//--------------------------------
}
	var constroiMatrizCargos = function(){
		var rangeX = cargosBounds.x.max - cargosBounds.x.min;
		var rangeY = cargosBounds.y.max - cargosBounds.y.min;		
		console.log("constroi", mapaCargos);
		var matriz = [];
		for(i=0; i<=rangeX; i++){
			for (j=0; j<=rangeY; j++){
				//debugger;
				var x = i + cargosBounds.x.min;
				var y = j + cargosBounds.y.min;
				var cargo =_.findWhere(mapaCargos, {x: x,y:y}) || false;
				//var cargo = (mapaCargos[x]!=undefined && mapaCargos[x][y]) ? mapaCargos[x][y] : false;

				if (!matriz[j]) matriz[j] = [];
				matriz[j][i] = cargo;
			}
		}
		return matriz;
	}

	var constroiMatrizAreas = function(){
		return mapaAreas.clean(undefined);
	}


var constroiDiagrama = function(){
	var resetMapas = function(){
		mapaCargos = [];
		mapaAreas = [];
		cargosBounds = {
			x:{min:false, max: false},
			y:{min:false, max: false}	
		}		
		Session.set('noRender',true);
	}




	var raiz = FlowRouter.getQueryParam('raiz') || null;


	resetMapas();
	constroiHierarquia(raiz);
	matrizAreas.set(constroiMatrizAreas());
	matrizCargos.set(constroiMatrizCargos());

	
	Meteor.setTimeout(function(){
		Session.set('noRender',false);
	});	
	$(".scroll-teste").mCustomScrollbar({
	    axis:"x"
	});		
}



Template.diagrama.onRendered(function(){
	Tracker.autorun(constroiDiagrama);
})

Template.diagrama.helpers({
	matrizAreas:function(){

		//return mapaAreas;
		//return matrizAreas.get();
		return matrizAreas.get();
	},
	matrizCargos:function(){
		//console.log(matrizCargos.get());

		return matrizCargos.get();
	},
	botaoUp:function(){
		return (this.id!="#" && this.id==FlowRouter.getQueryParam('raiz'));
	},
	noRender:function(){
		return Session.get('noRender');
	}
})

Template.diagrama.onRendered(function(){

})

Template.diagrama.events({
	'click .bloco-area':function(){
		FlowRouter.setQueryParams({raiz:this.id});
		//constroiDiagrama();

	},
	'click .subir-nivel':function(e){
		e.stopPropagation();
		var area = Areas.findOne({_id: this.id});
		FlowRouter.setQueryParams({raiz:area.paiId});
		//constroiDiagrama();
	},
	'click .bloco-cargo':function(){
		if (this.classificacao){
			Modal.show('_mostrarClassificacao',{classificacaoId: this.classificacao._id});
		}
	}
})

