Template.collectionsBoard.events({
  'click .add-sub-collection': function(event, template) {
    console.log(this);
    Modal.show('collectionsAdd', {
      projectId: FlowRouter.getParam('projectId'),
      collectionsSetId: FlowRouter.getParam('collectionsSetId'),
      parentId: this._id
    });
  }
});


Template.collectionsBoard.onRendered(function() {
  //dragula([document.querySelector('.subcollection-drag-area')]);
});