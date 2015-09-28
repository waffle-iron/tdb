var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Auxilio adicionado com sucesso: " + this.insertDoc.nome, "Sucesso");
  },

  // Called when any submit operation fails
  onError: function(formType, error) {

  },
};

AutoForm.hooks({
  "insertAuxiliosForm": hooksObject
});