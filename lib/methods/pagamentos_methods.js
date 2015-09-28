Meteor.methods({
	recomputar:function(pagamentoId){
		check(pagamentoId,String);
		var pagamento = Pagamentos.findOne({_id:pagamentoId});
		var userId = pagamento.userId;
		var folhaId = pagamento.folhaId;
		var doc = calcularCampos(userId,folhaId,{auxilios:pagamento.auxilios});
		Pagamentos.update({_id:pagamentoId},{$set:doc});
	}
})