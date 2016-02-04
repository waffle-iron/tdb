AutoForm.hooks({
  updateUserInformationForm: {
    onSuccess() {
      toastr.success('Profile updated successfully', 'Success');
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});
