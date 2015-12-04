Meteor.methods({
  'projects/add': function(doc) {
    check(doc, Schemas.Projects);
    return Projects.insert(doc);
  }
});
