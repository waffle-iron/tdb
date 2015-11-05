var constroi = function (raiz, newLine){

	var cargosAcc = new Array();

	var children = _.map(Areas.find({paiId: raiz}).fetch(), function(area, i){
		var areaFilha = constroi(area._id, newLine && !i);
		cargosAcc = _.union(cargosAcc , areaFilha.cargos);
		return areaFilha;
	});

	var cargos = Cargos.find({areaId: raiz}).fetch() || new Array();
	if (!children && !cargos)
		cargos.push({
			_id: "#",
			nome: "fantasma"
		})

	cargosAcc = _.union(cargosAcc,cargos);

	var area = (raiz) ? Areas.findOne({_id:raiz}) : {_id:"#", nome:"area-fantasma"};

	var data = {
		area: area,
		children: children,
		cargos: cargosAcc,
		newLine: newLine
	}

	if (area._id!="#"){
		var tipo = area.tipo;
		Blaze.renderWithData(Template.area, function(){return data}, $('tr')[tipo-1]);
	}

	var pai = Areas.findOne({_id:area.paiId});
	if (pai){
		for(i=area.tipo; i>pai.tipo; i--){
			console.log(area.nome);
			Blaze.renderWithData(Template.area,{cargos: data.cargos,area:{}}, $('tr')[i-1]);
		}
	}



	return data;
}
Template.diagrama2.onRendered(function(){
	this.autorun(constroi(null,true));
})

Template.area.helpers({
	colspan: function(){
		console.log(this);
		if (this.cargos)
			return this.cargos.length;
		else
			return 0;
	}
})