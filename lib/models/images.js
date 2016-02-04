const THUMB_WIDTH = 80;
const THUMB_HEIGHT = 80;
const CARD_WIDTH = 640;
const CARD_HEIGHT = 480;
function createThumb(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).resize(THUMB_WIDTH, THUMB_HEIGHT).stream().pipe(writeStream);
}
function createCard(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).resize(CARD_WIDTH, CARD_HEIGHT).stream().pipe(writeStream);
}

if (Meteor.isServer) {
  let imageStore = new FS.Store.S3('originals', {
    //  Optional
    region: 'sa-east-1',
    // Required
    accessKeyId: Meteor.settings.AWSAccessKeyId,
    secretAccessKey: Meteor.settings.AWSSecretAccessKey,
    bucket: Meteor.settings.AWSBucket,
    folder: 'original'
  });
  let thumbStore = new FS.Store.S3('thumbs', {
    region: 'sa-east-1',
    transformWrite: createThumb,
    accessKeyId: Meteor.settings.AWSAccessKeyId,
    secretAccessKey: Meteor.settings.AWSSecretAccessKey,
    bucket: Meteor.settings.AWSBucket,
    folder: 'thumbs'
  });
  let cardStore = new FS.Store.S3('cards', {
    region: 'sa-east-1',
    transformWrite: createCard,
    accessKeyId: Meteor.settings.AWSAccessKeyId,
    secretAccessKey: Meteor.settings.AWSSecretAccessKey,
    bucket: Meteor.settings.AWSBucket,
    folder: 'cards'
  });

  Images = new FS.Collection('Images', {
    stores: [imageStore, thumbStore, cardStore],
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
  let thumbStore = new FS.Store.S3('thumbs');
  let cardStore = new FS.Store.S3('cards');
  Images = new FS.Collection('Images', {
    stores: [imageStore, thumbStore, cardStore],
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
