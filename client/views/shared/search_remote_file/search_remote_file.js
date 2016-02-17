Template.searchRemoteFile.helpers({
  dataLoadingText() {
    let status = Template.instance().status.get();
    switch (status) {
      case SEARCH_STATUS.LOADING:
        return 'Downloading file...';
      default:
        return 'Download file';
    }
  },
  disabled() {
    let status = Template.instance().status.get();
    return status === SEARCH_STATUS.LOADING ? "disabled" : "";
  }
})

Template.searchRemoteFile.events({
  'click .btn-download': function(e, t) {
    let url = $('#search-remote-url').val();

    t.data.onBegin();
    t.status.set(SEARCH_STATUS.LOADING);
    
    Meteor.call('attachData', url, function(err) {
      if (err) {
        t.status.set(SEARCH_STATUS.ERROR);
        return t.data.onDownloadError(err);
      }

      Meteor.call('uploadFileFromUrl', url, function(error, fileObj) {
        if (error) {
          t.status.set(SEARCH_STATUS.ERROR);
          return t.data.onUploadError(error);
        }

        t.status.set(SEARCH_STATUS.SUCCESS);
        return t.data.onUploadSuccess(fileObj);
      });
    });


  }
});

Template.searchRemoteFile.onCreated(function() {
  this.status = new ReactiveVar(SEARCH_STATUS.NONE);
});
