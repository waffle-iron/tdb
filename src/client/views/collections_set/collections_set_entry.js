Template.collectionsSetEntry.onCreated(function() {
  this.subscribe('collectionsSet.single', FlowRouter.getParam('collectionsSetId'));
});

Template.collectionsSetEntry.helpers({
  collectionsSet() {
    return CollectionsSet.findOne({
      _id: FlowRouter.getParam('collectionsSetId'),
      projectId: FlowRouter.getParam('projectId')});
  }
});

Template.collectionsSetEntry.events({
  'click .new-collection': function(event, template) {
    Modal.show('collectionsAdd', {
      projectId: FlowRouter.getParam('projectId'),
      collectionsSetId: FlowRouter.getParam('collectionsSetId')
    });
  }
});


