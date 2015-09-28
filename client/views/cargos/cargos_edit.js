Template.cargosEdit.helpers({
	cargo: function(){
		return Cargos.findOne({_id: FlowRouter.getParam('id')});
	}
})


var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Cargo editado com sucesso: " + this.currentDoc.nome, "Sucesso");
    FlowRouter.go('cargos.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },
};

AutoForm.hooks({
  "updateCargosForm": hooksObject
});