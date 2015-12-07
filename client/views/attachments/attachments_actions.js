Template.organizationsActions.helpers({
  beforeRemove(collection, id) {
      let doc = collection.findOne(id);
      alertify.confirm('Remove <b>' + doc.name + '</b>?', () => {
        this.remove();
      }).set('title', 'Confirm');
    },
    onSuccess() {
      toastr.success('Organization deleted successfully', 'Success');
    },
    onError() {
      toastr.error(error.toString(), 'Error');
    }
});
