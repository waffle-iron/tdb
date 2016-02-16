Template.searchRemoteFile.helpers({

})

Template.searchRemoteFile.events({
  'click .btn-download': function(e, t) {
    let url = $('#search-remote-url').val();

    // Make a HEAD request to discover if file can be downloaded.
    let mockFile = new FS.File();
    mockFile.attachData(url, function(err) {
      if (err) return t.data.onDownloadError(err);

      Meteor.call('uploadFileFromUrl', url, function(error, fileObj) {
        if (error) return t.data.onUploadError(error);

        return t.data.onUploadSuccess(null, fileObj);
      });
    });
  }
});


