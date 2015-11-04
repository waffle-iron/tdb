Template.senioridadesEdit.helpers({
	carreira: function(){
		return Senioridades.findOne({_id: FlowRouter.getParam('id')});
	}
})


var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Senioridade editada com sucesso: " + this.currentDoc.nome, "Sucesso");
    FlowRouter.go('senioridades.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },
};

AutoForm.hooks({
  "updateSenioridadesForm": hooksObject
});