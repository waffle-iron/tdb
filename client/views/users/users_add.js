var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Usuário convidado com sucesso: " + this.insertDoc.email, "Sucesso");
    FlowRouter.go('users.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
    console.log(error);
  	toastr.error(error.reason,error.error);
  },
};

AutoForm.hooks({
  "insertUsersForm": hooksObject
});