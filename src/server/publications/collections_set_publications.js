import { Technologies } from '../../imports/api/technologies/technologies';

Meteor.publishComposite('collectionsSet.single', function(collectionsSetId) {
  check(collectionsSetId, String);
  return {
    find() {
      return CollectionsSet.find({ _id: collectionsSetId });
    },
    children: [{
      find(collectionsSet) {
        return Projects.find({ _id: collectionsSet.projectId });
      },
      children: [{
        find(project) {
          return Technologies.find({
            _id: { $in: _.pluck(project.technologiesStash, 'technologyId') }
          });
        }
      }]
    }, {
      find(collectionsSet) {
        return Collections.find({
          collectionsSetId: collectionsSet._id
        });
      },
      children: [{
        find(collection) {
          return Collections.find({
            parentId: collection._id
          });
        }
      }]
    }]
  };
});
