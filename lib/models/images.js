const THUMB_WIDTH = 80;
const THUMB_HEIGHT = 80;
const CARD_WIDTH = 640;
const CARD_HEIGHT = 480;
const ABOUT_BOX_WIDTH = 500;
const ABOUT_BOX_HEIGHT = 500;

FS.File.prototype.S3Filename = function() {
  return 's3/' + this._id + '-' + this.name();
};

FS.File.prototype.S3Url = function(storeName) {
  let store = this.getCollection().storesLookup[storeName];
  let urlHost = 'https://s3-sa-east-1.amazonaws.com/';
  let urlPath = [store.bucket, this.copies[storeName].key].join('/');
  return urlHost + urlPath;
};

if (Meteor.isServer) {
  let imageStore = new FS.Store.S3('images', {
    //  Optional
    region: 'sa-east-1',
    // Required
    accessKeyId: Meteor.settings.AWSAccessKeyId,
    secretAccessKey: Meteor.settings.AWSSecretAccessKey,
    bucket: Meteor.settings.public.AWSBucket,
    beforeWrite(fileObj) {
      fileObj.name('image');
    },
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
  let imageStore = new FS.Store.S3('images', {
    bucket: 'techdb',
  });
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
