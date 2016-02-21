Template.attachmentsAddFromUpload.events({

});


Template.attachmentsAddFromUpload.helpers({
  attachmentUpload() {
    return Template.instance().attachment.get();
  },
  fileObjFromUpload() {
    return Template.instance().fileObj.get();
  },
  isUploading() {
    return Template.instance().isUploading.get();
  },
  onUploadBegin() {
    let t = Template.instance();
    return function(fileObj) {
      t.fileObj.set(fileObj);
      t.isUploading.set(true);
    };
  },
  onUploadSuccess() {
    let t = Template.instance();
    return function(fileObj) {
      toastr.success(`The file ${fileObj.original.name} was downloaded and attached to this document.`);
      t.isUploading.set(false);
      t.fileObj.set(fileObj);
      t.attachment.set({
        name: fileObj.original.name,
        from: 'upload',
        file: {
          _id: fileObj._id,
          type: fileObj.original.type,
          url: fileObj.S3Url('files'),
        }
      });
    };
  }
});

Template.attachmentsAddFromUpload.onCreated(function() {
  this.file = new ReactiveVar;
  this.fileObj = new ReactiveVar;
  this.attachment = new ReactiveVar;
  this.isUploading = new ReactiveVar(false);
});
