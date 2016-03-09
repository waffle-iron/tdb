AutoForm.hooks({
  insertProjectsForm: {
    onSuccess() {
      toastr.success('Project created successfully: ' + this.insertDoc.name, 'Success');
      FlowRouter.go('projects.dashboard');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.projectsAdd.events({
  'click .btn-create-attachment': function(e){
    e.preventDefault();
    Modal.show('attachmentsAddModal');
  }
});


Template.projectsAdd.onCreated(function() {
  this.subscribe('organizations.quickList');
  this.subscribe('technologies.quickList');
  this.subscribe('attachments.quickList');
})