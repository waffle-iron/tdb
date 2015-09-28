Template.feriasPessoaisEdit.helpers({
	ferias: function(){
		return Ferias.findOne({_id: FlowRouter.getParam('id')});
	}
})


var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Férias Pessoais editadas com sucesso.", "Sucesso");
    FlowRouter.go('ferias.pessoais.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	toastr.error(error,"Erro");
  },
};

AutoForm.hooks({
  "updateFeriasPessoaisForm": hooksObject
});