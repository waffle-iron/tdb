Template.carreirasEdit.helpers({
	carreira: function(){
		return Carreiras.findOne({_id: FlowRouter.getParam('id')});
	}
})


var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Carreira editado com sucesso: " + this.currentDoc.nome, "Sucesso");
    FlowRouter.go('carreiras.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },
};

AutoForm.hooks({
  "updateCarreirasForm": hooksObject
});