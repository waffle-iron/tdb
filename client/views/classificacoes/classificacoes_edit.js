Template.classificacoesEdit.helpers({
	produto: function(){
		return Produtos.findOne({_id: FlowRouter.getParam('id')});
	}
})


var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Classificação editado com sucesso: " + this.currentDoc.nome, "Sucesso");
    FlowRouter.go('classificacoes.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },
};

AutoForm.hooks({
  "updateClassificacoesForm": hooksObject
});