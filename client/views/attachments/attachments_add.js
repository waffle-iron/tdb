Template.attachmentsAdd.events({
  'change input[name="url"]': function(e, t) {
    let url = e.target.value;
    
    Meteor.call('getMetadataFromUrl', url, function(err, res) {
      console.log(res);  

    });
  }
});




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
