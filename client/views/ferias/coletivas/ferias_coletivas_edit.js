Template.feriasColetivasEdit.helpers({
	ferias: function(){
		return Ferias.findOne({_id: FlowRouter.getParam('id')});
	}
})


var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Férias Coletivas editadas com sucesso.", "Sucesso");
    FlowRouter.go('ferias.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },
};

AutoForm.hooks({
  "updateFeriasColetivasForm": hooksObject
});