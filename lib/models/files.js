ACCEPT_FILES = ['image/*', 'application/pdf'];

if (Meteor.isServer) {
  let store = new FS.Store.S3('files', {
    //  Optional
    region: 'sa-east-1',
    // Required
    accessKeyId: Meteor.settings.AWSAccessKeyId,
    secretAccessKey: Meteor.settings.AWSSecretAccessKey,
    bucket: Meteor.settings.public.AWSBucket,
  });
  Files = new FS.Collection('Files', {
    stores: [store],
     filter: {
      allow: {
        contentTypes: ACCEPT_FILES
      },
      onInvalid: function(message) {
        console.log(message);
      }
    }
  });
}

if (Meteor.isClient) {
  let store = new FS.Store.S3('files', {
    bucket: 'techdb',
  });
  Files = new FS.Collection('Files', {
    stores: [store],
    filter: {
      allow: {
        contentTypes: ACCEPT_FILES
      },
      onInvalid: function(message) {
        toastr.error(message);
      }
    }
  });

  Files.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return true;
    },
    download: function() {
      return true;
    }
  });
}
