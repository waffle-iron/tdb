Template.attachmentsAdd.events({
  'input input[name="imageUrl"]': function(e, t) {
    let attachment = t.attachment.get();
    attachment.imageUrl = e.target.value;
    t.attachment.set(attachment);
  },
});

Template.attachmentsAdd.helpers({
  attachment() {
    return Template.instance().attachment.get();
  },
  onSuccess() {
    let template = Template.instance();
    return function(res) {
      template.attachment.set({
        name: res.title,
        description: res.description,
        imageUrl: res.image,
        url: res.url
      });
    }
  },
  onDownloadError() {
    return function(err) {
      console.error('DownloadError:', err);
      switch (err.error) {
        case 500:
          toastr.error('Could not read remote data from url. HEAD request is not allowed');
        default:
          toastr.error('Error trying to download the file');
      }
    }
  },
  onUploadError(){
    return function(err){
      console.error('UploadError', err);
      toastr.error('Error uploading file');
    }
  },
  onUploadSuccess(){
    let template = Template.instance();
    return function(fileObj){
      toastr.success(`The file ${fileObj.name} was downloaded and attached to this document.`);

      template.attachment.set({
        fileId: fileObj._id,
        name: fileObj.name,
        type: fileObj.type,
        url: fileObj.url
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
  },

  insertAttachmentDownloadForm: {
    onSuccess() {
      toastr.success('Attachment created successfully: ' + this.insertDoc.name, 'Success');
      FlowRouter.go('attachments.dashboard');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});
