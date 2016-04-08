Meteor.publishComposite('collectionsSet.single', function(collectionsSetId) {
  check(collectionsSetId, String);
  return {
    find() {
      return CollectionsSet.find({_id: collectionsSetId});
    },
    children: [{
      find(collectionsSet) {
        return Projects.find({_id: collectionsSet.projectId});
      }
    }]
  };
});
