Template.attachmentsAddFromUrl.helpers({
  attachmentFromUrl() {
    return Template.instance().attachment.get();
  },
  fileObjFromUrl() {
    return Template.instance().fileObj.get();
  },
  isDownloading() {
    return Template.instance().isDownloading.get();
  },
  onDownloadBegin() {
    let t = Template.instance();
    return function() {
      t.isDownloading.toggle();
    };
  },
  onDownloadError() {
    let t = Template.instance();
    return function(err) {
      toastr.error(t.getDownloadErrorMessage(err));
      t.isDownloading.toggle();
    };
  },
  onUploadError() {
    let template = Template.instance();
    return function(err) {
      toastr.error('Error uploading file');
      t.isDownloading.toggle();
    };
  },
  onUploadSuccess() {
    let t = Template.instance();
    return function(fileObj) {
      toastr.success(`The file ${fileObj.original.name} was downloaded and attached to this document.`);
      t.fileObj.set(fileObj);
      t.isDownloading.toggle();
      t.attachment.set({
        fileId: fileObj._id,
        type: fileObj.original.type,
        name: fileObj.original.name
      });
    };
  }
});

Template.attachmentsAddFromUrl.onCreated(function() {
  this.fileId = new ReactiveVar;
  this.fileObj = new ReactiveVar;
  this.attachment = new ReactiveVar;
  this.isDownloading = new ReactiveVar(false);

  this.getDownloadErrorMessage = (err) => {
    switch (err.error) {
      case 500:
        return 'Could not read remote data from url. HEAD request is not allowed';
      case 503:
        return "Website is unavaliable to receive HEAD requests. Download can't be done";
      default:
        return 'Error trying to download the file';
    }
  };
});
