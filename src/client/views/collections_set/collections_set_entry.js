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

  this.drake.on('drop', (el, target, source, sibling) => {
    let techId = $(el).data('technology-id');
    let targetType = $(target).data('drag');
    let sourceType = $(source).data('drag');

    // stash ---> collection
    if (targetType === 'collection' && sourceType === 'stash') {
      let targetCollection = $(target).data('collection');

      console.log(targetCollection, techId);
      Collections.methods.pushTechnology.call({collectionId: targetCollection, techId: techId}, (err, res) => {
        if (err) {
          toastr.error(err.toString(), 'Error');
        }
      });
    }

    if (sourceType === 'collection') {
      let sourceCollection = $(target).data('collection');
    }


    if ($(target).data('drag') === 'collection') {

    } else if ($(target).data())
    console.log(source);
    console.log(target);
  });
});
