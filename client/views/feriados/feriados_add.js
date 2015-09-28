var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Feriado adicionado com sucesso.", "Sucesso");
    FlowRouter.go('feriados.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	console.log(error);
  },
};

AutoForm.hooks({
  "insertFeriadosForm": hooksObject
});