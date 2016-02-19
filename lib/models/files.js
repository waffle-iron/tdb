ACCEPT_FILES = ['image/*', 'application/pdf'];

if (Meteor.isServer) {
  let store = new FS.Store.S3('files', Meteor.settings.AWS.S3);
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
  let store = new FS.Store.S3('files');
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
