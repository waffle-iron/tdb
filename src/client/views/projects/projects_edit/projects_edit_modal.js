AutoForm.hooks({
  updateProjectsModalForm: {
    onSuccess() {
      toastr.success('Project updated successfully', 'Success');
      if (this.template.data && typeof this.template.data.onSuccess === 'function') {
        this.template.data.onSuccess();
      }
      this.template.parent().data.onSuccess();
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.projectsEditModal.onCreated(function() {
  this.subscribe('projects.single', this.data.projectId);
});

Template.projectsEditModal.helpers({
  project() {
    return Projects.findOne(Template.instance().data.projectId);
  }
});
