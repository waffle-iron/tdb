Template.attachmentsAddFromUpload.events({

});


Template.attachmentsAddFromUpload.helpers({
  attachmentUpload() {
    return Template.instance().attachment.get();
  },
  fileObjFromUpload() {
    return Template.instance().fileObj.get();
  },
  onUploadSuccess() {
    let template = Template.instance();
    return function(fileObj) {
      toastr.success(`The file ${fileObj.original.name} was downloaded and attached to this document.`);
      console.log(fileObj);
      template.fileObj.set(fileObj);
      template.attachment.set({
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
});
