/*StashedTech = new Mongo.Collection('StashedTech');


StashedTech.helpers({
  project() {
    return Projects.findOne({
      _id: this.projectId
    });
  },
  technology() {
    return Technologies.find({
      _id: this.technologyId
    });
  }
});

StashedTech.attachSchema(Schemas.StashedTech);
StashedTech.attachBehaviour('timestampable');
*/