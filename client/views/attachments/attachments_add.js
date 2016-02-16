Template.attachmentsAdd.events({
  'input input[name="imageUrl"]': function(e, t) {
    let attachment = t.attachment.get();
    attachment.imageUrl = e.target.value;
    t.attachment.set(attachment);
  },

  'click .btn-download': function(e, t) {
    let url = $('#search-file-url').val();
    console.log('File url:', url);

    let newFile = new FS.File();
    newFile.attachData(url, function(err) {
      if (err) {
        switch (err.error) {
          case 500:
            console.log('Could not read remote data from url. HEAD request is not allowed');
          default:
            console.log(err);
        }
      } else {
        Meteor.call('uploadFileFromUrl', url, function(error, fileObj){
          if (error){
            console.log('Error uploading file:', error)
          } else{
            console.log('fileObj:', fileObj);
            let attachment = t.attachment.get();

            attachment.name = fileObj.name;
            attachment.fileId = fileObj._id,

            t.attachment.set(attachment);
          }
        });
      }
    });
  }
});

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
