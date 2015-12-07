Template.technologiesActions.helpers({
  beforeRemove() {
    return function(collection, id) {
      let doc = collection.findOne(id);
      alertify.confirm('Remove <b>' + doc.name + '</b>?', () => {
        this.remove();
      }).set('title', 'Confirm');
    };
  },
  onSuccess() {
    return function() {
      toastr.success('Technologie deleted successfully', 'Success');
    };
  },
  onError() {
    return function() {
      toastr.error(error.toString(), 'Error');
    };
  }
});


Template.projectsActions.events({
  'click #btn-edit': function(e) {
    e.stopPropagation();
    FlowRouter.go('technologies.edit', {id: this._id});
  },
  'click #btn-remove': function(e) {
    e.stopPropagation();
  }
});
