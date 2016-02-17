Template.attachmentsAddFromUpload.events({

});

Template.attachmentsAddFromUpload.onCreated(function() {
  this.file = new ReactiveVar;
  this.attachment = new ReactiveVar;
})

Template.attachmentsAddFromUpload.helpers({
  onUploadSuccess() {
    let template = Template.instance();
    return function(fileObj) {
      toastr.success(`The file ${fileObj.name} was downloaded and attached to this document.`);
      template.attachment.set({
      	fileId: fileObj._id,
      	name: fileObj.name,
      	type: fileObj.type
      })
    }
  }
});


