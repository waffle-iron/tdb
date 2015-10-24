
mapaAreas = [];
mapaCargos = [];
var matrizAreas = new ReactiveVar();
var matrizCargos = new ReactiveVar();
var constroiHierarquia = function(raiz){
	//debugger;

	var area = Areas.findOne({_id: raiz}) || {nome: "AES", tipo: 0,_id: "*"}
	if (area._id=="#") raiz = null;

	var filhos = Areas.find({paiId: raiz},{sort:{nome:1}}).fetch();
	var cargos = Cargos.find({areaId: raiz}, {sort: {gradeHorizontal:1}}).fetch();	
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
	})

	//areas sem cargos
	var ultimoNaColuna = !Areas.findOne({caminho:area._id, tipo:{$gt:area.tipo}}) && area._id!="*";
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
	matrizCargos.set(null);
	matrizAreas.set(null);

	var raiz = FlowRouter.getQueryParam('raiz') || null;
	console.log("construindo...", raiz);
	constroiHierarquia(raiz);


	Meteor.setTimeout(function(){matrizAreas.set(mapaAreas.clean())});;
	var t = transpose(mapaCargos)
	console.log(t);
	Meteor.setTimeout(function(){matrizCargos.set(t)});

}


Template.diagrama2.helpers({
	matrizAreas:function(){
		//console.log(matrizAreas.get());
		return matrizAreas.get();
	},
	matrizCargos:function(){
		//console.log(matrizAreas.get());
		return matrizCargos.get();
	},
	botaoSubir:function(){
		return this.areaId!="*" && FlowRouter.getQueryParam('raiz')==this.areaId;
	}
})
Template.diagrama2.onRendered(function(){
	$(".scroll-diagrama").mCustomScrollbar({
	    axis:"x"
	});		

	Tracker.autorun(constroiDiagrama);
})

Template.diagrama2.events({
	'click .mudar-raiz':function(){
		//console.log(this);
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