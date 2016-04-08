CollectionsSet = new Mongo.Collection('collectionsSet');
Schemas.CollectionsSet = new SimpleSchema({
  name: {
    type: String
  },
  collections: {
    type: [String]
  },
  projectId: {
    type: String
  }
});


CollectionsSet.helpers({
  project() {
    return Project.findOne({
      _id: this.projectId
    });
  }
});

CollectionsSet.attachSchema(Schemas.CollectionsSet);
CollectionsSet.attachBehaviour('timestampable');