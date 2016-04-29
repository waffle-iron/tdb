Template.collectionsBoard.events({
  'click .add-sub-collection': function(event, template) {
    Modal.show('collectionsAdd', {
      projectId: FlowRouter.getParam('projectId'),
      collectionsSetId: FlowRouter.getParam('collectionsSetId'),
      parentId: this._id
    });
  }
});

Template.collectionsBoard.helpers({
  getDrake() {
    return Template.instance().data.drake;
  },

});

Template.subCollectionsDragArea.onRendered(function() {
  let drake = Template.instance().data.drake;
  drake.containers.push(this.find('.sub-collection-drag-area'));
});

Template.subCollectionsDragArea.helpers({
  getTechnology() {
    return Technologies.findOne({
      _id: this.valueOf()
    });
  }
});


Template.deleteDragArea.onRendered(function() {
  let drake = Template.instance().data.drake;
  drake.containers.push(this.find('.delete-drag-area'));
});