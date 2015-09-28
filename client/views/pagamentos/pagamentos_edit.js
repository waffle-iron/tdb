Template.pagamentosEdit.helpers({
	pagamento: function(){
		return Produtos.findOne({_id: FlowRouter.getParam('id')});
	}
})


var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Pagamento editado com sucesso.", "Sucesso");
    FlowRouter.go('pagamentos.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },
};

AutoForm.hooks({
  "updatePagamentosForm": hooksObject
});