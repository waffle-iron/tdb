AutoForm.hooks({
  updateOrganizationsForm: {
    onSuccess() {
      toastr.success('Organization updated successfully', 'Success');
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});
