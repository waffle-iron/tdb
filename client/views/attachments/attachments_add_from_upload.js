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
    return function() {
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
        fileId: fileObj._id,
        name: fileObj.original.name,
        type: fileObj.original.type
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
