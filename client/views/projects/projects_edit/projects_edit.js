AutoForm.hooks({
  updateProjectsForm: {
    onSuccess() {
      toastr.success('Project updated successfully', 'Success');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.projectsEdit.events({
  'click .btn-create-attachment': function(e){
    e.preventDefault();
    Modal.show('attachmentsAddModal');
  }
});

Template.projectsEdit.onCreated(function() {
  this.subscribe('projects.single', FlowRouter.getParam('id'));
  this.subscribe('attachments.quickList');
  this.subscribe('technologies.quickList');
  this.subscribe('organizations.quickList');
});

Template.projectsEdit.helpers({
  organization() {
    return Projects.findOne(FlowRouter.getParam('id'));
  }
});
