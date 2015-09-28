Template.folhasEdit.helpers({
	produto: function(){
		return Produtos.findOne({_id: FlowRouter.getParam('id')});
	}
})


var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Folha editado com sucesso: " + this.currentDoc.nome, "Sucesso");
    FlowRouter.go('folhas.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },
};

AutoForm.hooks({
  "updateFolhasForm": hooksObject
});