SearchSource.defineSource('globalSearch', function(searchText, options) {
  Meteor._sleepForMs(1000);


  let search = esEngine.search({
    index: 'techdb',
    body: {
      query: {
        bool: {
          should: [
            {
              match: {
                name: {
                  query: searchText,
                  boost: 2
                }
              }
            },
            {
              match: {
                'description.longText': {
                  query: searchText,
                }
              }
            },
            {
              match: {
                description: {
                  query: searchText,
                }
              }
            }]
        }
      }
    }
  });

  let metadata = {
    total: search.total,
    took: search.took
  };

  return {
    data: search.results,
    metadata: metadata
  };
});
