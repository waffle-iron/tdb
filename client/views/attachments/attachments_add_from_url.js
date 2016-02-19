Template.attachmentsAddFromUrl.helpers({
  attachmentFromUrl() {
    return Template.instance().attachment.get();
  },
  fileObjFromUrl() {
    return Template.instance().fileObj.get();
  },
  isUploading() {
    return Template.instance().isUploading.get();
  },
  onDownloadError() {
    let t = Template.instance();
    return function(err) {
      toastr.error(t.getDownloadErrorMessage(err));
    };
  },
  onUploadBegin() {
    let t = Template.instance();
    return function() {
      t.isUploading.set(true);
    };
  },
  onUploadError() {
    let template = Template.instance();
    return function(err) {
      toastr.error('Error uploading file');
    };
  },
  onUploadSuccess() {
    let t = Template.instance();
    return function(fileObj) {
      t.fileObj.set(fileObj);
      t.isUploading.set(false);
      toastr.success(`The file ${fileObj.original.name} was downloaded and attached to this document.`);
    };
  }
});

Template.attachmentsAddFromUrl.onCreated(function() {
  this.fileId = new ReactiveVar;
  this.fileObj = new ReactiveVar;
  this.attachment = new ReactiveVar;
  this.isUploading = new ReactiveVar(false);

  this.getDownloadErrorMessage = (err) => {
    switch (err.error) {
      case 500:
        return 'Could not read remote data from url. HEAD request is not allowed';
      case 503:
        return "Website is unavaliable to receive HEAD requests. Download can't be done";
      default:
        return 'Error trying to download the file';
    }
  }
});
