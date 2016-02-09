AutoForm.hooks({
  insertAttachmentForm: {
    onSuccess() {
        toastr.success('Attachment created successfully: ' + this.insertDoc.name, 'Success');
        FlowRouter.go('attachmentsDashboard');
      },
      onError(formType, error) {
        toastr.error(error.toString(), 'Error');
      },
  }
});
