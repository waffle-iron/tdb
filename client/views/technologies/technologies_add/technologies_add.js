AutoForm.hooks({
  insertTechnologiesForm: {
    onSuccess() {
      toastr.success('Technology created successfully: ' + this.insertDoc.name, 'Success');
      FlowRouter.go('technologies.dashboard');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.technologiesAdd.events({
  'click .btn-create-attachment': function(e){
    e.preventDefault();
    Modal.show('attachmentsAddModal');
  }
});

Template.technologiesAdd.onCreated(function() {
  this.subscribe('projects.quickList');
  this.subscribe('organizations.quickList');
  this.subscribe('attachments.quickList');
})