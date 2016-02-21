Template.filePreview.helpers({
  file() {
    return Template.instance().data.file;
  },
  classIconName() {
    return Template.instance().classIconName();
  },
  s3Url() {
    return Template.instance().data.file.S3Url('files');
  }
});

Template.filePreview.onCreated(function() {
  this.classIconName = () => {
    let file = this.data.file || {};
    switch (file.original.type) {
      case 'application/pdf':
        return 'fa-file-pdf-o';

      case 'image/jpg':
      case 'image/png':
      case 'image/jpeg':
        return 'fa-file-image-o';

      default:
        return 'fa-file-o';
    }
  };
});
