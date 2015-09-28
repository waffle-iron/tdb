Template.feriadosEdit.helpers({
	feriado: function(){
		return Feriados.findOne({_id: FlowRouter.getParam('id')});
	}
})


var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Feriado editado com sucesso.", "Sucesso");
    FlowRouter.go('feriados.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },
};

AutoForm.hooks({
  "updateFeriadosForm": hooksObject
});