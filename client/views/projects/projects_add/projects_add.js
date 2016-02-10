AutoForm.hooks({
  insertProjectsForm: {
    onSuccess() {
      toastr.success('Project created successfully: ' + this.insertDoc.name, 'Success');
      FlowRouter.go('projectsDashboard');
    },
    onError(formType, error) {
      toastr.success(error.toString(), 'Error');
    },
  }
});
