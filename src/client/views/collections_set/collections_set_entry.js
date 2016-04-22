Template.collectionsSetEntry.onCreated(function() {
  this.subscribe('collectionsSet.single', FlowRouter.getParam('id'));
});

Template.collectionsSetEntry.helpers({
  collectionsSet() {
    return CollectionsSet.findOne({
      _id: FlowRouter.getParam('id'),
      projectId: FlowRouter.getParam('projectId')});
  },
  drake() {
    return Template.instance().drake;
  }
});

Template.collectionsSetEntry.events({
  'click .new-collection': function(event, template) {
    Modal.show('collectionsAdd', {
      projectId: FlowRouter.getParam('projectId'),
      collectionsSetId: FlowRouter.getParam('id')
    });
  }
});


Template.collectionsSetEntry.onRendered(function() {
  this.drake = dragula([]);
});
