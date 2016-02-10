AutoForm.hooks({
  insertTechnologiesForm: {
    onSuccess() {
      toastr.success('Technologie created successfully: ' + this.insertDoc.name, 'Success');
      FlowRouter.go('technologiesDashboard');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});
