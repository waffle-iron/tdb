AutoForm.hooks({
  insertAttachmentForm: {
    onSuccess() {
        toastr.success('Attachment created successfully: ' + this.insertDoc.name, 'Success');
        FlowRouter.go('attachments.index');
      },
      onError(formType, error) {
        toastr.error(error.toString(), 'Error');
      },
  }
});
