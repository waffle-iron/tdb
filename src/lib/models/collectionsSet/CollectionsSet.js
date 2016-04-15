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
  // top level collections
  collections() {
    return Collections.find({
      collectionsSetId: this._id,
      parentId: {
        $exists: false
      }
    });
  }
});

CollectionsSet.attachSchema(Schemas.CollectionsSet);
CollectionsSet.attachBehaviour('timestampable');
