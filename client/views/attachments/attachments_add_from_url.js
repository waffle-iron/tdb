Template.attachmentsAddFromUrl.helpers({
  attachment(){
  	return Template.instance().attachment.get();
  },

  isLoading(){
    return Template.instance().searchRemoteFileStatus.get() === SEARCH_STATUS.LOADING;
  },

  onBegin(){
    let template = Template.instance();
    return function(){
      template.searchRemoteFileStatus.set(SEARCH_STATUS.LOADING);  
    }
  },

  onDownloadError() {
    return function(err) {
      console.error('DownloadError:', err);
      template.searchRemoteFileStatus.set(SEARCH_STATUS.ERROR);  
      switch (err.error) {
        case 500:
          toastr.error('Could not read remote data from url. HEAD request is not allowed');
        default:
          toastr.error('Error trying to download the file');
      }
    }
  },
  onUploadError() {
    return function(err) {
      console.error('UploadError', err);
      template.searchRemoteFileStatus.set(SEARCH_STATUS.ERROR);  
      toastr.error('Error uploading file');
    }
  },
  onUploadSuccess() {
    let template = Template.instance();
    return function(fileObj) {
      toastr.success(`The file ${fileObj.name} was downloaded and attached to this document.`);
      template.searchRemoteFileStatus.set(SEARCH_STATUS.SUCCESS);  
      template.attachment.set({
        fileId: fileObj._id,
        name: fileObj.name,
        type: fileObj.type,
        url: fileObj.url
      });
    }
  }
})

Template.attachmentsAddFromUrl.onCreated(function(){
  this.attachment = new ReactiveVar;
  this.searchRemoteFileStatus = new ReactiveVar(SEARCH_STATUS.NONE);
});