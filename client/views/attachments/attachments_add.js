Template.attachmentsAdd.events({
  'input input[name="imageUrl"]': function(e, t){
    let attachment = t.attachment.get();
    attachment.imageUrl = e.target.value;
    t.attachment.set(attachment);
  }
})

Template.attachmentsAdd.helpers({
  attachment() {
    return Template.instance().attachment.get();
  },
  onSuccess() {
    // Needs to be initialized before the function to get
    // template reactive context 
    let template = Template.instance();

    return function(res) {
      template.attachment.set({
        name: res.title,
        description: res.description,
        imageUrl: res.image,
        url: res.url
      });
    }
  }
});

Template.attachmentsAdd.onCreated(function() {
  this.attachment = new ReactiveVar({});
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
