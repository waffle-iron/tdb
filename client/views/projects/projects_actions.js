Template.projectsActions.helpers({
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
      toastr.success('Project deleted successfully', 'Success');
    };
  },
  onError() {
    return function() {
      toastr.error(error.toString(), 'Error');
    };
  }
});

