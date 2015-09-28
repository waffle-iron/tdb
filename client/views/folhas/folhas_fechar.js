Template.folhasFechar.events({
  'click #folha-fechar':function(){
    Modal.show('_folhasFechar', {doc:this});
  }
})

Template._folhasFechar.helpers({
  participacao:function(){
    var pagamentos = Pagamentos.find({folhaId:this.doc._id}).fetch();
    return _.reduce(pagamentos,function(memo,pagamento){
      return memo + pagamento.participacao;
    },0);
  },
  decimo:function(){
    var pagamentos = Pagamentos.find({folhaId:this.doc._id}).fetch();
    return _.reduce(pagamentos,function(memo,pagamento){
      return memo + pagamento.decimo;
    },0);
    /*
    var somatorias = _.reduce(pagamentos,function(memo,pagamento){
      if (!memo.participacao) memo.participacao = 0;
      if (!memo.decimo) memo.decimo = 0;
      memo.participacao = memo.participacao + pagamento.participacao;
      memo.decimo = memo.decimo + pagamento.decimo;
      return memo;
    },{});
    */
  }

})

var hooksObject = {
	before:{
		update:function(doc){
			doc.$set.status = 'fechada';

			return doc;
		}
	},
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Folha fechada com sucesso", "Sucesso");
    Modal.hide();
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },

};

AutoForm.hooks({
  "fecharFolhasForm": hooksObject
});