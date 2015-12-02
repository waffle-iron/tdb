AutoForm.hooks({
  insertTechnologiesForm: {
    onSuccess() {
      toastr.success('Technologie created successfully: ' + this.insertDoc.name, 'Success');
      FlowRouter.go('technologies.index');
    },
    onError(formType, error) {
      toastr.success(error.toString(), 'Error');
    },
  }
});
