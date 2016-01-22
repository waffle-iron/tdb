if (Meteor.isServer) {
  let imageStore = new FS.Store.S3('images', {
    //  Optional
    region: 'sa-east-1',
    // Required
    accessKeyId: Meteor.settings.AWSAccessKeyId,
    secretAccessKey: Meteor.settings.AWSSecretAccessKey,
    bucket: Meteor.settings.AWSBucket
  });

  Images = new FS.Collection('Images', {
    stores: [imageStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      }
    }
  });
}

// On the client just create a generic FS Store as don't have
// access (or want access) to S3 settings on client
if (Meteor.isClient) {
  let imageStore = new FS.Store.S3('images');
  Images = new FS.Collection('Images', {
    stores: [imageStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      },
      onInvalid: function(message) {
        toastr.error(message);
      }
    }
  });
}

// Allow rules
Images.allow({
  insert: function() { return true; },
  update: function() { return true; },
  download: function() { return true; }
});
