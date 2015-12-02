Template.usersActions.helpers({
  beforeRemove() {
    return function(collection, id) {
      let doc = collection.findOne(id);
      alertify.confirm('Remove <b>' + doc.identification() + '</b>?', () => {
        this.remove();
      }).set('title', 'Confirm');
    };
  },
  onSuccess() {
    return function() {
      toastr.success('User deleted successfully', 'Success');
    };
  },
  onError() {
    return function() {
      toastr.error(error.toString(), 'Error');
    };
  }
});

