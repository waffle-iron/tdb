Attachments.methods = {};

Attachments.methods.add = new ValidatedMethod({
  name: 'Attachments.methods.add',
  validate: Schemas.Attachment.validator(),
  run(doc) {
    return Attachments.insert(doc);
  }
});

Meteor.methods({
  'Attachments.methods.remove': function(attchId) {
    check(attchId, String);
    return Attachments.remove({ _id: attchId });
  }



});

if (Meteor.isServer) {

  Meteor.methods({
    // Need to be on the server to avoid CORS.
    'uploadFileFromUrl': function(url) {
      check(url, String);

      function uploadFileFromUrl(url, callback) {
        console.log('Starting to download file from remote url:', url);
        Files.insert(url, function(error, fileObj) {
          console.log('Download finished.');
          if (error) callback(error);
          console.log(fileObj);
          callback(null, {
            _id: fileObj._id,
            name: fileObj.original.name,
            type: fileObj.original.type,
          });
        });
      }

      let uploadFileFromUrlSync = Async.wrap(uploadFileFromUrl);
      return uploadFileFromUrlSync(url);
    }
  })
}
