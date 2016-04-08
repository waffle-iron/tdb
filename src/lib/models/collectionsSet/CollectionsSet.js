CollectionsSet = new Mongo.Collection('collectionsSet');
Schemas.CollectionsSet = new SimpleSchema({
  name: {
    type: String
  },
  collectionsId: {
    type: [String],
    optional: true
  },
  projectId: {
    type: String
  }
});


CollectionsSet.helpers({
  project() {
    return Projects.findOne({
      _id: this.projectId
    });
  },
/*  collections() {
    return this.collectionsId && Collections.find({
      _id: {$in: this.collectionsId}
    });
  }*/
  collections() {
    return Collections.find({
      collectionsSetId: this._id
    });
  }
});

CollectionsSet.attachSchema(Schemas.CollectionsSet);
CollectionsSet.attachBehaviour('timestampable');
