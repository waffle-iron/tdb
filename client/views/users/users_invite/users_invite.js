AutoForm.hooks({
  inviteUsersForm: {

    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
      toastr.success('Usuário convidado com sucesso: ' + this.insertDoc.email, 'Sucesso');
      FlowRouter.go('usersDashboard');
    },

    // Called when any submit operation fails
    onError: function(formType, error) {
      toastr.error(error.reason, error.error);
    },
  }
});
