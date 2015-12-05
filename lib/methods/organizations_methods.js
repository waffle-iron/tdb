Meteor.methods({
  'organizations/add': function(doc) {
    check(doc, Schemas.Organization);

    let id = Organizations.insert(doc);

    return id;
  },
  'organizations/search': function(searchText) {
    let query = {
      bool: {
        should: [
          {
            match_phrase_prefix: {
              name: {
                query: searchText,
                slop: 5
              }
            }
          }
        ]
      }
    };

    let result = EsClient.search({
      index: 'techdb',
      type: 'organization',
      body: {
        query: query
      }
    });

    return result.hits.hits.map((doc) => doc._source);
  }
});
