Template.fornecedoresEdit.helpers({
	fornecedor: function(){
		return Fornecedores.findOne({_id: FlowRouter.getParam('id')});
	}
})


var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Fornecedor editado com sucesso: " + this.currentDoc.nome, "Sucesso");
    FlowRouter.go('fornecedores.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },
};

AutoForm.hooks({
  "updateFornecedoresForm": hooksObject
});