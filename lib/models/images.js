buildS3mappingFolder = function(cloudinaryId, name) {
  if (!Meteor.settings.public.Cloudinarys3MappingFolder) throw new Error('Must configure s3mappingFolder');
  return `${Meteor.settings.public.Cloudinarys3MappingFolder}/${cloudinaryId}-${name}`;
};

FS.File.prototype.cloudinaryId = function() {
  return buildS3mappingFolder(this._id, this.name());
};

FS.File.prototype.S3Url = function(storeName) {
  let store = this.getCollection().storesLookup[storeName];
  let urlHost = 'https://s3.amazonaws.com';
  if (this.copies && this.copies[storeName]) {
    // TODO: Fix hardcoded amazon url
    let bucket = 'envisioning';
    let folder = 'tdb';
    let key = this.copies[storeName].key;

    console.log([store.bucket, store.folder, this.copies[storeName].key].join('/'));

    return `${urlHost}/${bucket}/${folder}/${key}`;


     /*
     *  Not working... Need fix
     *  let urlPath = [store.bucket, store.folder, this.copies[storeName].key].join('/');
     *  return urlHost + urlPath;
     */
  }
};

if (Meteor.isServer) {
  let imageStore = new FS.Store.S3('images', {
    region: Meteor.settings.AWS.S3.region,
    accessKeyId: Meteor.settings.AWS.S3.accessKeyId,
    secretAccessKey: Meteor.settings.AWS.S3.secretAccessKey,
    bucket: Meteor.settings.AWS.S3.bucket,
    folder: Meteor.settings.AWS.S3.folder,
    ACL: 'public-read',
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
