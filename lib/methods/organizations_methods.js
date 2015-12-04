Meteor.methods({
  'organizations/add': function(doc) {
    check(doc, Schemas.Organization);

    let id = Organizations.insert(doc);

    EsClient.index({
      index: 'techdb',
      type: 'organization',
      id: id,
      body: {
        name: doc.name,
      }
    });
  }
});
