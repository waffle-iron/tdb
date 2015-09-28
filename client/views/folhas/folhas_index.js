participacaoTotal = new ReactiveVar();

var meses = [
	{nome:'Jan',valor:'0'},
	{nome:'Fev',valor:'1'},
	{nome:'Mar',valor:'2'},
	{nome:'Abr',valor:'3'},
	{nome:'Mai',valor:'4'},
	{nome:'Jun',valor:'5'},
	{nome:'Jul',valor:'6'},
	{nome:'Ago',valor:'7'},
	{nome:'Set',valor:'8'},
	{nome:'Out',valor:'9'},
	{nome:'Nov',valor:'10'},
	{nome:'Dez',valor:'11'}
]


Template.folhas.helpers({
	chuncked:function(arr,size){
		var chunks = [];
		while (arr.length > 0)
		    chunks.push(arr.splice(0, size));

		return chunks
	},
	colunaAtivo:function(){
		return (Session.equals(this.nome,true))?'checked':'';
	},
	getColunas:function(){
		return colunas.get();
		return [
			{nome: 'Setor', valor: 1},
			{nome: 'Cargo', valor: 2},
			{nome: 'DU', valor: 3},
			{nome: 'Salário', valor: 4},
			{nome: 'Encargos', valor: 5},
			{nome: 'VT', valor: 6},
			{nome: 'VR', valor: 7},
			{nome: 'VA', valor: 8},
			{nome: 'Auxílio', valor: 9},
			{nome: 'Subtotal', valor: 10},
			{nome: 'Participação', valor: 11},
			{nome: '13º', valor: 12},
			{nome: 'Total', valor: 13},
			{nome: 'Ações', valor: 14},	
		]
	},
	meses:function(){
		return meses;
	},
	existeFolha:function(){
		var ano = Session.get('anoSelecionado');
		var mes = parseInt(this.valor);
		var folha = Folhas.findOne({ano:ano,mes:mes});
		return (folha)?true:false;

	},
	folha:function(){
		var ano = Session.get('anoSelecionado');
		var mes = Session.get('mesSelecionado');
		var folha = Folhas.findOne({ano: ano,mes:mes});

		return folha;

	},
	mesAtivo:function(){
		return (Session.get('mesSelecionado')==this.valor)?'active':'';
	},
});


Template.folhas.events({
	'click #mostrar-filtros':function(){
		Modal.show('pagamentosFiltros');
	},
	'click .setar-mes':function(e){
		var mes = this.valor;
		Session.set('mesSelecionado',parseInt(mes));
	},
	'click .toggle-coluna':function(e){
		var $e = $(e.target);
		var state = $e.is(':checked');
		Session.set(this.nome,state);	
	},
	'click .resize':function(){
		Meteor.setTimeout(adjustSize, 250)
	},
	'click #folha-info':function(){

	},
	'click #fechar-folha':function(){


		var participacaoReal = somatorias.participacao;
		var decimoReal = somatorias.decimo;
		alertify.prompt('Qual foi a provisão participação real? <b>(ideal: ' + somatorias.participacao + ')</b>', somatorias.participacao , 
			function(evt, value){
				participacaoReal = value;

				alertify.prompt('Qual foi a provisão décimo real? <b>(ideal: ' + somatorias.decimo + ')</b>', somatorias.decimo , 
					function(evt, value){
						decimoReal = value;
					}
				);					
			}
		);		
			

		console.log(participacaoReal,decimoReal);
		//Meteor.call('fecharFolha',this._id);
	}
})

Template.folhas.onCreated (function(){
	//esconder navbar
	$('body').addClass('mini-navbar');

	//selecionar mes/ano
	
	if (!Session.get('mesSelecionado')) Session.set('mesSelecionado', moment().month()+1);

	
});




var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Cargo editado com sucesso: " + this.currentDoc.nome, "Sucesso");
    FlowRouter.go('cargos.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },
};

AutoForm.hooks({
  "updateCargosForm": hooksObject
});