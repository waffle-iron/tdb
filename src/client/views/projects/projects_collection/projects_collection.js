Template.projectsCollection.onCreated(function() {
  this.subscribe('collections.single', FlowRouter.getParam('collectionId'));
});

Template.projectsCollection.helpers({
  collection() {
    return Collections.findOne({_id: FlowRouter.getParam('collectionId')});
  }
});
