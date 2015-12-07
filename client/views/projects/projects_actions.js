Template.projectsActions.helpers({
  beforeRemove() {
    return function(collection, id) {
      let doc = collection.findOne(id);
      removeConfirmation(doc.name, () => {
        this.remove();
      });
    };
  },
  onSuccess() {
    return function(result) {
      removeSuccess();
    };
  },
  onError() {
    return function() {
      removeError();
    };
  }
});

