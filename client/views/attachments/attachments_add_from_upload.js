Template.attachmentsAddFromUpload.events({

});


Template.attachmentsAddFromUpload.helpers({
  attachmentUpload() {
    return Template.instance().attachment.get();
  },
  fileObjFromUpload() {
    let fileFromUpload = Template.instance().fileObj.get();
    if (fileFromUpload) {
      return Files.findOne({ _id: fileFromUpload._id });
    }
    return fileFromUpload;
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

  this.autorun(() => {
    let fileObj = this.fileObj.get();
    if (fileObj) {
      this.subscribe('files.single', fileObj._id);
    }
  });
});
