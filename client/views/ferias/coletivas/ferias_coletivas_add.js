var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Férias Coletivas adicionadas com sucesso.", "Sucesso");
    FlowRouter.go('ferias.coletivas.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
    console.log(error);
  },
};

AutoForm.hooks({
  "insertFeriasColetivasForm": hooksObject
});