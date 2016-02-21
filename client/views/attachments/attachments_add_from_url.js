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
  onUploadBegin() {
    let t = Template.instance();
    return function(fileId, sourceUrl) {
      t.sourceUrl.set(sourceUrl);
    };
  },
  onUploadSuccess() {
    let t = Template.instance();
    return function(fileObj) {
      toastr.success(`The file ${fileObj.original.name} was downloaded and attached to this document.`);
      t.fileObj.set(fileObj);
      t.isDownloading.toggle();
      t.attachment.set({
        name: fileObj.original.name,
        from: 'remote_url',
        file: {
          _id: fileObj._id,
          type: fileObj.original.type,
          s3Url: fileObj.S3Url('files'),
          sourceUrl: t.sourceUrl.get()
        }
      });
    };
  }
});

Template.attachmentsAddFromUrl.onCreated(function() {
  this.fileObj = new ReactiveVar;
  this.sourceUrl = new ReactiveVar;
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
