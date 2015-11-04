var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Carreira adicionada com sucesso: " + this.insertDoc.nome, "Sucesso");
    FlowRouter.go('carreiras.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {

  },
};

AutoForm.hooks({
  "insertCarreirasForm": hooksObject
});