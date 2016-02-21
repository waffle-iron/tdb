Template.attachmentPreview.helpers({
  attachment() {
    return Template.instance().data;
  },
  classIconName() {
    return Template.instance().classIconName();
  },
  isImage() {
    return Template.instance().data.file.type.indexOf('image') === 0;
  },
  isFromWeb() {
    return Template.instance().data.from === 'web';
  }
});

Template.attachmentPreview.onCreated(function() {
  this.classIconName = () => {
    switch (this.data.file.type) {
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
