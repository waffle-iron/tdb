
var chart;

var drawChart = function(){
	var options = {};
	var anoSelecionado = Session.get('EstatisticasAnoSelecionado');
	

	var meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']	

	var campos = [
		{key:'salarioReal', label:"Salário Real", cor:['111','54','98'],acc:false},
		{key:'encargos',label:"Encargos", cor:['255','113','130'],acc:false},
		{key:'auxilio',label:"Auxílio", cor:['255','154','93'],acc:false},
		{key:'vt',label:"VT", cor:['159','97','100'],acc:false},
		{key:'vr',label:"VR", cor:['70','32','102'],acc:false},
		{key:'va',label:"VA", cor:['255','122','90'],acc:false},
		{key:'participacao',label:"Participação", cor:['0','170','160'],acc:true},
		{key:'decimo',label:"13o", cor:['33','140','141'],acc:true},
		{key:'total',label:"Total", cor:['239','113','38'],acc:false}
	]

	var data = [];
	
	var somatorias = [];
	_.each(meses,function(mes,i){
		var folha = Folhas.findOne({ano:anoSelecionado,mes:i});

		
		if (folha){
			//se tiver folha nesse mês, pega os pagamentos
			var filtro = constroiFiltro('EstatisticasPagamentos',['setorId','cargoId','userId']);
			var selector = _.extend(filtro,{folhaId:folha._id});
			var pagamentos = Pagamentos.find(selector).fetch(); 
		
			//para cada pagamento
			_.each(pagamentos, function(pagamento,j){
				//para cada campo
				_.each(campos,function(campo){
					//se nao existe o campo para somatoria ou nao é cumulativo e é o primeiro pagamento, volta pra 0
					if (!somatorias[campo.key] || (!campo.acc && j==0)) somatorias[campo.key] = 0;
					//acumula
					somatorias[campo.key] = parseFloat(somatorias[campo.key]) + parseFloat(pagamento[campo.key]);
				});
			});
		}else{
			//zerar campos não cumulativos
			_.each(campos,function(campo){
				if (!campo.acc) somatorias[campo.key] = 0;
			})
		}

		//pra cada campo
		_.each(campos,function(campo){
			//ainda nao abriu array bidimensional
			if (!data[campo.key]) data[campo.key] = [];
			//
			if (!somatorias[campo.key]) somatorias[campo.key] = 0;

			data[campo.key].push(parseFloat(somatorias[campo.key]).toFixed(2));
		});		
	});

	var montaCor = function(array,opacity){
		return 'rgba(' + array.join() + ',' + opacity + ")";
	}

	datasets = _.map(campos,function(campo){
		return {
			label: campo.label,
			fillColor: montaCor(campo.cor,0.1),
			strokeColor: montaCor(campo.cor,1),
			pointColor: montaCor(campo.cor,1),
			pointStrokeColor: '#fff',
			pointHighlightFill : '#fff',
			pointHighlightStroke : montaCor(campo.cor,1),
			data: data[campo.key]
		}
	})
	


	if (chart){
		chart.destroy();
	}
	var chartData = {
	    labels: meses,
	    datasets: datasets
	};	
	var ctx = document.getElementById("myChart").getContext("2d");
	chart = new Chart(ctx).Line(chartData,{datasetFill : false,bezierCurve: false});		

	/*
	if (!chart){
		console.log("criando...");
		var chartData = {
		    labels: meses,
		    datasets: datasets
		};		
		var ctx = document.getElementById("myChart").getContext("2d");
		chart = new Chart(ctx).Line(chartData,{datasetFill : false,bezierCurve: false});		
	}else{
		console.log("update...");
		//chart.datasets = datasets;
		//console.log(chart);
		chart.update();
	}
	*/

}

Template.estatisticasPagamentos.onRendered(function(){


	Tracker.autorun(drawChart);
})