var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Senioridade adicionado com sucesso: " + this.insertDoc.nome, "Sucesso");
    FlowRouter.go('senioridades.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {

  },
};

AutoForm.hooks({
  "insertSenioridadesForm": hooksObject
});