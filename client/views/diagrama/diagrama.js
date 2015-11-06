GHOST_CHAR = "#";

mapaAreas = [];
mapaCargos = [];
mapaCoordenadores = [];
var matrizAreas = new ReactiveVar();
var matrizCargos = new ReactiveVar();
var matrizCoordenadores = new ReactiveVar();

var coordCarreira;;
var coordSenioridadeId;
var coordSenioridade;





var constroiHierarquia = function(raiz){
	var area = Areas.findOne({_id: raiz}) || {nome: "AES", tipo: 0,_id: GHOST_CHAR}
	if (area._id==GHOST_CHAR) raiz = null;

	var filhos = Areas.find({paiId: raiz},{sort:{nome:1}}).fetch();
	var cargos = Cargos.find({areaId: raiz, carreiraId: {$ne: coordCarreira._id}}).fetch();	
	if (cargos){
		cargos = _.sortBy(cargos,function(cargo){
			var carreira = cargo.carreira();
			return carreira.gradeHorizontal;
		});
	}

	var csCargos = cargos.length;
	var csFilhos = 0;

	_.each(filhos,function(filho){
		csFilhos = csFilhos + constroiHierarquia(filho._id);
	})

	var cs = csCargos + csFilhos || 1;

	var pushNull = function(nivel, cs, por){
		if (!mapaAreas[nivel]) mapaAreas[nivel] = [];
		mapaAreas[nivel].push({
			areaId: null,
			colspan: cs,
			por: por
		});			
	}

	var tipoToNome = ['aes','vp','dir','ger','coord'];

	//cargos da área
	_.each(cargos,function(cargo, i){
		var carreira = cargo.carreira();

		if (!carreira.coordenador){
			var arrayVazio =[];
			for (i=0;i<carreira.grade;i++){
				arrayVazio.push({
					cargoId:false,
					motivo: 'grade'
				})
			}
			var arrayCargos = _.union(arrayVazio, _.map(carreira.estrutura, function(senioridadeId, j){
				var senioridade = Senioridades.findOne({_id: senioridadeId});
				var classificacao = Classificacoes.findOne({cargoId: cargo._id,senioridadeId: senioridadeId});
				return {
					cargoId: cargo._id,
					senioridadeId: senioridadeId,
					label: senioridade.abreviacao,
					texto: (j==0)? carreira.nome:'',
					cor: carreira.cor,
					temPai: (j>0)?true:false,
					classificacao: classificacao
				}
			}));

			mapaCargos.push(arrayCargos);
		}
	})


	var ultimoNaColuna = !Areas.findOne({caminho:area._id, tipo:{$gt:area.tipo}}) && area._id!=GHOST_CHAR;

	//coordenadores
	var coordenadores = Cargos.find({areaId: area._id,carreiraId: coordCarreira._id}).fetch();
	var coordCargos = _.map(coordenadores, function(coordenador){
		var classificacao = Classificacoes.findOne({cargoId: coordenador._id,senioridadeId: coordSenioridadeId});
		return {
			cargoId: coordenador._id,
			senioridadeId: coordSenioridadeId,
			label: coordSenioridade.abreviacao,
			texto: coordCarreira.nome,
			temPai: false,
			classificacao: classificacao
		}
	})

	if (ultimoNaColuna){
		mapaCoordenadores.push({
			colspan: cs,
			cargos: coordCargos,
		})
	}else{
		if (cargos.length){
			mapaCoordenadores.push({
				colspan: cargos.length,
				cargos: coordCargos,
			})	
		}
	}

	//areas sem cargos
	if (!cargos.length && ultimoNaColuna){
		mapaCargos.push([{
			cargoId:null,
			colocadoPor: area.nome
		}])
	}


	//buracos nas areas que estão abaixo do atual
	if (cargos.length || cs > (csCargos + csFilhos)){
		if (area.tipo<4){
			for (i=area.tipo+1;i<=4;i++){
				pushNull(i, csCargos || 1, area.nome + " olhando pra baixo")
			}

		}
	}

	//buracos nas areas que estão acima do atual
	var pai = Areas.findOne({_id: area.paiId}) || {tipo: 0};
	if (pai){
		if (area.tipo-pai.tipo>1){
			for (i=pai.tipo+1;i<area.tipo;i++){
				pushNull(i, cs, area.nome + " olhando pra cima")
			}
		}
	}

	if (!mapaAreas[area.tipo]) mapaAreas[area.tipo] = [];
	mapaAreas[area.tipo].push({
		nome: area.nome,
		colspan: cs,
		classe: tipoToNome[area.tipo],
		areaId: area._id,
		areaImg: tipoToImg(area.tipo)
	});	 

	return cs;
}

transpose = function(a) {
	//debugger;
  var w = a.length ? a.length : 0;

  var comprimentos = _.map(a,function(arr){
  	return arr.length
  })

  //  h = a[0] instanceof Array ? a[0].length : 0;
  h = _.max(comprimentos);

  if(h === 0 || w === 0) { return []; }

  var i, j, t = [];

  for(i=0; i<h; i++) {
    t[i] = [];
    for(j=0; j<w; j++) {
      t[i][j] = a[j][i];
    }
  }

  return t;
};

function constroiDiagrama(){
	Session.set('noRender',true);
	mapaAreas = [];
	mapaCargos = [];
	mapaCoordenadores = [];

	/*
	matrizCargos.set(null);
	matrizAreas.set(null);
	matrizCoordenadores.set(null);
	*/

	var raiz = FlowRouter.getQueryParam('raiz') || null;
	console.log("construindo...", raiz);
	constroiHierarquia(raiz);

	/*
	Meteor.setTimeout(function(){matrizCoordenadores.set(mapaCoordenadores)});
	Meteor.setTimeout(function(){matrizAreas.set(mapaAreas.clean())});;
	Meteor.setTimeout(function(){matrizCargos.set(transpose(mapaCargos))});
	*/
	matrizCoordenadores.set(mapaCoordenadores);
	matrizAreas.set(mapaAreas.clean());
	matrizCargos.set(transpose(mapaCargos));

	Meteor.setTimeout(function(){$(".scroll-diagrama").mCustomScrollbar("update");});
}



Template.diagramaArvore.onRendered(function(){
	coordCarreira = Carreiras.findOne({coordenador: true});
	coordSenioridadeId = coordCarreira.estrutura[0];
	coordSenioridade = Senioridades.findOne({_id: coordSenioridadeId});	
		

	$(".scroll-diagrama").mCustomScrollbar({
	    axis:"x"
	});			

	this.autorun(constroiDiagrama);
});


Template.diagramaArvore.events({
	'click .mudar-raiz':function(){
		if (this.areaId==GHOST_CHAR) return;
		FlowRouter.setQueryParams({raiz: this.areaId});
	},
	'click .subir-nivel':function(e){
		e.stopPropagation();
		var area = Areas.findOne({_id: this.areaId});
		FlowRouter.setQueryParams({raiz: area.paiId || null});
	},
	'click .bloco-cargo':function(){
		if (this.classificacao){
			Modal.show('_mostrarClassificacao',{classificacaoId: this.classificacao._id});
		}
	},	
})

Template.diagramaArvore.helpers({
	matrizAreas:function(){
		return matrizAreas.get();
	},
	matrizCargos:function(){
		return matrizCargos.get();
	},
	matrizCoordenadores: function(){
		return matrizCoordenadores.get();
	},
	botaoSubir:function(){
		return this.areaId!=GHOST_CHAR && FlowRouter.getQueryParam('raiz')==this.areaId;
	},
})


Template.diagrama.onRendered(function(){
	Meteor.typeahead.inject();	
})

Template.diagrama.events({
	'click .conhecer' : function(){
		FlowRouter.setQueryParams({raiz: this._id});
	},
	'click .btn-voltar':function(e){
		console.log(this);
		e.stopPropagation();
		var area = Areas.findOne({_id: this._id});
		FlowRouter.setQueryParams({raiz: area.paiId || null});
	},	
})



Template.diagrama.helpers({
	areaRaiz: function(){
		var raiz = FlowRouter.getQueryParam('raiz');
		if (!raiz) return {nome:"AES"};
		var area = Areas.findOne({_id: raiz});
		return area;
	},
	filhosDiretos: function(){
		var raiz = FlowRouter.getQueryParam('raiz') || null;
		var filhos = Areas.find({paiId: raiz});
		return filhos;
	},
	areas: function(){
		return Areas.find().fetch();
	},
	selected: function(event, suggestion, datasetName) {
		FlowRouter.setQueryParams({raiz: suggestion._id});
	},
	listaHorizontal: function(){
		var raiz = FlowRouter.getQueryParam('raiz') || null;
		if (!raiz) return true;
		var area = Areas.findOne({_id: raiz});
		if (area.tipo==1) return true;
		return false;
	},
	areaImg: function(){
		return tipoToImg(this.tipo);
	},
	area: function(id){
		return Areas.findOne({_id: id});
	}
})