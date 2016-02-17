Meteor.methods({
  // Need to be on the server to avoid CORS.
  uploadFileFromUrl: function(url) {
    check(url, String);

    function upload(url, callback) {
      console.info('Starting to download file from remote url:', url);
      Files.insert(url, function(error, fileObj) {
        if (error) return callback(error);
        return callback(null, {
          _id: fileObj._id,
          name: fileObj.original.name || 'undefined',
          type: fileObj.original.type,
          url: fileObj.data.source.url,
        });
      });
    }

    // Async to get file metadata.
    let uploadFileFromUrlSync = Async.wrap(upload);
    return uploadFileFromUrlSync(url);
  }
});
