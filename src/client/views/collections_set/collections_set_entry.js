Template.collectionsSetEntry.onCreated(function() {
  this.subscribe('collectionsSet.single', FlowRouter.getParam('id'));
});

Template.collectionsSetEntry.helpers({
  collectionsSet() {
    return CollectionsSet.findOne({
      _id: FlowRouter.getParam('id'),
      projectId: FlowRouter.getParam('projectId')
    });
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
    this.drake.cancel(true);
    let techId = $(el).data('technology-id');
    let targetType = $(target).data('drag');
    let sourceType = $(source).data('drag');

    // stash ---> collection
    if (targetType === 'collection' && sourceType === 'stash') {
      let targetCollection = $(target).data('collection');
      $(el).hide();
      Collections.methods.pushTechnology.call({ collectionId: targetCollection, techId: techId }, (err, res) => {
        if (err) {
          toastr.error(err.toString(), 'Error');
          $(el).show();
        }
      });
    }

    // collection ---> collection
    if (sourceType === 'collection' && targetType === 'collection') {
      let sourceCollection = $(source).data('collection');
      let targetCollection = $(target).data('collection');

      if (sourceCollection !== targetCollection) {
        $(el).hide();
        Collections.methods.moveTechnology.call({ source: sourceCollection, target: targetCollection, techId: techId },
          (err, res) => {
            if (err) {
              toastr.error(err.toString(), 'Error');
              $(el).show();
            }
          });
      }
    }
  });
});
