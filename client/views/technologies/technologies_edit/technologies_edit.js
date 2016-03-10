AutoForm.hooks({
  updateTechnologiesForm: {
    onSuccess() {
      toastr.success('Technology updated successfully', 'Success');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});


Template.technologiesEdit.events({
  'click .btn-create-attachment': function(e){
    e.preventDefault();
    Modal.show('attachmentsAddModal');
  }
});

Template.technologiesEdit.onCreated(function() {
  this.subscribe('technologies.single', FlowRouter.getParam('id'));
});

Template.technologiesEdit.helpers({
  tech() {
    return Technologies.findOne(FlowRouter.getParam('id'));
  }
});
