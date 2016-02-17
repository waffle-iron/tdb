Template.attachmentsAdd.events({
  'click .nav-tabs li': function(e, t){
  	Template.instance().attachment.set({});
  }
});

Template.attachmentsAdd.helpers({
});

AutoForm.hooks({
  insertAttachmentForm: {
    onSuccess() {
      toastr.success('Attachment created successfully: ' + this.insertDoc.name, 'Success');
      FlowRouter.go('attachments.dashboard');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

