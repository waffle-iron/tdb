Template.auxiliosEdit.helpers({
	produto: function(){
		return Produtos.findOne({_id: FlowRouter.getParam('id')});
	}
})


var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Auxilio editado com sucesso: " + this.currentDoc.nome, "Sucesso");
    FlowRouter.go('auxilios.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },
};

AutoForm.hooks({
  "updateAuxiliosForm": hooksObject
});