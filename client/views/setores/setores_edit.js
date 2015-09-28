Template.setoresEdit.helpers({
	setor: function(){
		return Setores.findOne({_id: FlowRouter.getParam('id')});
	}
})


var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Setor editado com sucesso: " + this.currentDoc.nome, "Sucesso");
    FlowRouter.go('setores.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },
};

AutoForm.hooks({
  "updateSetoresForm": hooksObject
});