
mapaAreas = [];
mapaCargos = [];
mapaCoordenadores = [];
var matrizAreas = new ReactiveVar();
var matrizCargos = new ReactiveVar();
var matrizCoordenadores = new ReactiveVar();

//var carreiraCoordenadorId = _.pluck(Carreiras.find({coordenador:true}).fetch(),'_id');

var coordCarreira;;
var coordSenioridadeId;
var coordSenioridade;

Template.diagrama.onCreated(function(){
	coordCarreira = Carreiras.findOne({coordenador: true});
	coordSenioridadeId = coordCarreira.estrutura[0];
	coordSenioridade = Senioridades.findOne({_id: coordSenioridadeId});	
});



var constroiHierarquia = function(raiz){
	//debugger;

	var area = Areas.findOne({_id: raiz}) || {nome: "AES", tipo: 0,_id: "*"}
	if (area._id=="#") raiz = null;

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


	var ultimoNaColuna = !Areas.findOne({caminho:area._id, tipo:{$gt:area.tipo}}) && area._id!="*";

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
		console.log(area.nome);
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

	//console.log("Coordenadores ", area.nome, " (" , cs, ") ->", coordenadores);


	//areas sem cargos
	
	//console.log(area.nome, " ultimo na linha-> ", ultimoNaColuna);
	if (!cargos.length && ultimoNaColuna){
		mapaCargos.push([{
			cargoId:null,
			colocadoPor: area.nome
		}])
	}


	//buracos nas areas que estão abaixo do atual
	if (cargos.length || cs > (csCargos + csFilhos)){
		//console.log(area.nome + "!!!!!");
		if (area.tipo<4){
			////console.log(area.nome, "!!");
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
		areaId: area._id
	});
	


	 
	//console.log(area.nome," -> colspan:", cs); 	
	 
	

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

	matrizCargos.set(null);
	matrizAreas.set(null);
	matrizCoordenadores.set(null);

	var raiz = FlowRouter.getQueryParam('raiz') || null;
	console.log("construindo...", raiz);
	constroiHierarquia(raiz);

	Meteor.setTimeout(function(){matrizCoordenadores.set(mapaCoordenadores)});
	Meteor.setTimeout(function(){matrizAreas.set(mapaAreas.clean())});;
	Meteor.setTimeout(function(){matrizCargos.set(transpose(mapaCargos))});

}


Template.diagrama.helpers({
	areas: function(){
		return Areas.find().fetch();
	},
	  selected: function(event, suggestion, datasetName) {
	    // event - the jQuery event object
	    // suggestion - the suggestion object
	    // datasetName - the name of the dataset the suggestion belongs to
	    // TODO your event handler here
	    console.log(suggestion._id);
	    FlowRouter.setQueryParams({raiz: suggestion._id});
	  },
	matrizAreas:function(){
		//console.log(matrizAreas.get());
		return matrizAreas.get();
	},
	matrizCargos:function(){
		//console.log(matrizAreas.get());
		return matrizCargos.get();
	},
	matrizCoordenadores: function(){
		return matrizCoordenadores.get();
	},
	botaoSubir:function(){
		return this.areaId!="*" && FlowRouter.getQueryParam('raiz')==this.areaId;
	}
})
Template.diagrama.onRendered(function(){
	$(".scroll-diagrama").mCustomScrollbar({
	    axis:"x"
	});		
	Meteor.typeahead.inject();

	this.autorun(constroiDiagrama);
})

Template.diagrama.events({
	'click .mudar-raiz':function(){
		if (this.areaId=="*") return;
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
	}	
})