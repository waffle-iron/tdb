AutoForm.hooks({
  insertOrganizationForm: {
    onSuccess() {
        toastr.success('Organization created successfully: ' + this.insertDoc.name, 'Success');
        FlowRouter.go('organizations.dashboard');
      },
      onError(formType, error) {
        toastr.error(error.toString(), 'Error');
      },
  }
});
