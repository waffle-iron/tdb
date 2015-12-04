Meteor.methods({
  'organizations/add': function(doc) {
    check(doc, Schemas.Organization);
    return Organizations.insert(doc);
  }
});
