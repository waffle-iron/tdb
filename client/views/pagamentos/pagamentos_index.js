
adjustSize = function(){
	var pagamentosDT = $('#pagamentosDT').DataTable();
	pagamentosDT.columns.adjust().draw();
}

colunas = new ReactiveVar([
	{nome: 'Setor', valor: 1, padrao:false},
	{nome: 'Cargo', valor: 2, padrao:false},
	{nome: 'DU', valor: 3, padrao:true},
	{nome: 'Salário', valor: 4, padrao:false},
	{nome: 'Adiantamento', valor: 5, padrao:false},
	{nome: 'Desconto', valor: 6, padrao:false},
	{nome: 'Salário Real', valor: 7, padrao:true},
	{nome: 'Encargos', valor: 8, padrao:true},
	{nome: 'VT', valor: 9, padrao:true},
	{nome: 'VR', valor: 10, padrao:true},
	{nome: 'VA', valor: 11, padrao:true},
	
	{nome: 'Subtotal', valor: 12, padrao:false},
	{nome: 'Participação', valor: 13, padrao:true},
	{nome: '13º', valor: 14, padrao:true},
	{nome: 'Auxílio', valor: 15, padrao:false},
	{nome: 'Total', valor: 16, padrao:true},
	{nome: 'Ações', valor: 17, padrao:true},	
]);

var toggleColunas = function(){
	var pagamentosDT = $('#pagamentosDT').DataTable();
	//console.log(colunas.get());
	_.each(colunas.get(),function(c){
		var state = !!Session.get(c.nome);
		//console.log (c.nome + " " + state);
		pagamentosDT.column(c.valor).visible(state);
	});
	adjustSize();
}


setPagina = function(){
	var pagamentosDT = $('#pagamentosDT').DataTable();
	console.log("setando pagina para " + Session.get('paginaSelecionada'));
	pagamentosDT.page(Session.get('paginaSelecionada')).draw('page');
}


Template.pagamentos.onRendered(function(){
	Session.set('init',false);

	var pagamentosDT = $("#pagamentosDT").DataTable();
	//Estado inicial dos checkboxes
	_.each(colunas.get(),function(c){
		if (Session.get(c.nome)===undefined && c.padrao) Session.set(c.nome,true);
	})	

	//Estado inicial da página
	if (!Session.get('paginaSelecionada')) Session.set('paginaSelecionada', 0);
	//Observar mudanças de pagina
	pagamentosDT.on( 'page.dt', function () {
	    var info = pagamentosDT.page.info();
	    Session.set('paginaSelecionada',info.page);
	} );

	Tracker.autorun(toggleColunas);
	
	//Tracker.autorun(setPagina);
	//Meteor.setTimeout(function(){setPagina()},2000);

	//window resize
	var throttled = _.throttle(function(){adjustSize();}, 100);
	$(window).resize(throttled);	
});

Template.pagamentos.helpers({
	filtro:function(){
		//console.log("FOLHA",this.folha);
		var filtro = constroiFiltro('Folhas',['cargoId','setorId','userId']);
		filtro.folhaId = this.folha;
		return filtro;
	}
})
Template.pagamentosAcoes.helpers({
	beforeRemove: function () {
      return function (collection, id) {
        var doc = collection.findOne(id);
        var object = this;
		alertify.confirm('Remover pagamento?', function(){
			object.remove();
		});
      };
    },
    folhaAberta:function(){
    	var folha = Folhas.findOne({_id:this.folhaId});
    	return (folha.status=='aberta');
    }
})

Template.pagamentosAcoes.events({
	'click #recomputar-pagamento':function(){
		console.log(this._id);
		Meteor.call('recomputar',this._id);
	}
})