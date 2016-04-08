Template.projectsCollection.onCreated(function() {
  this.subscribe('collectionsSet.single', FlowRouter.getParam('collectionsSetId'));
});

Template.projectsCollection.helpers({
  collectionsSet() {
    return CollectionsSet.findOne({
      _id: FlowRouter.getParam('collectionsSetId'),
      projectId: FlowRouter.getParam('projectId')});
  },
  project() {
    return Projects.findOne({_id: FlowRouter.getParam('projectId')});
  }
});
