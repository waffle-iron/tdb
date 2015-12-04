Meteor.methods({
  'technologies/add': function(doc) {
    check(doc, Schemas.Technology);
    return Technologies.insert(doc);
  }
});
