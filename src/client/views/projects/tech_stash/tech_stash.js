Template.techStash.events({
  'click .add-to-stash': function(event, template) {
    Modal.show('techStashAdd', {
      projectId: template.data._id
    });
  }
});


Template.techStash.onCreated(function() {
  this.autorun(() => {
    this.subscribe('techStash.single', );
  });
});
