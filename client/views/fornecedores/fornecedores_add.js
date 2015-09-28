var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Fornecedor adicionado com sucesso: " + this.insertDoc.nome, "Sucesso");
    FlowRouter.go('fornecedores.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {

  },
};

AutoForm.hooks({
  "insertFornecedoresForm": hooksObject
});