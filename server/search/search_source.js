const DEFAULT_NAME_BOOST = 100;
const DEFAULT_DESCRIPTION_BOOST = 1;
const DEFAULT_NAME_FUZZINESS = 2;
const DEFAULT_DESCRIPTION_FUZZINESS = 1;

esEngine = new ElasticSearchEngine(esClient);


/**
 * SearchSouce globalSearch
 * get data from any source (in this case, esEngine)
 *
 * options:
 * @nameBoost {Integer} the weight of Name on the calculation of relevance
 * @nameFuzziness {Integer} Name's level of fuzziness
 * @descriptionBoost {Integer} the weight of Description/Description.longText on the calculation of relevance
 * @descriptionFuzziness {Integer} Description/DEscription.longText 's level of fuzziness
 * returns:
 * {object}
 *  @data -> results
 *  @metadata -> total, took
 */
SearchSource.defineSource('globalSearch', function(searchText, options) {
  options = options || {};
  let nameBoost = options.nameBoost || DEFAULT_NAME_BOOST;
  let nameFuzziness = options.nameFuzziness || DEFAULT_NAME_FUZZINESS;
  let descriptionBoost = options.descriptionBoost || DEFAULT_DESCRIPTION_BOOST;
  let descriptionFuzziness = options.descriptionFuzziness || DEFAULT_DESCRIPTION_FUZZINESS;
  let types = options.types || [];


  let words = searchText.trim().split(' ');
  let lastWord = words[words.length - 1] || '';


  let query = {
    bool: {
      must: [                   //  At least one must match
        {
          bool: {
            should: [           // Any of these conditions should match, the most, more relevant
              {
                match: {
                  name: {
                    query: searchText,
                    boost: nameBoost
                  }
                }
              },
              {
                prefix: {
                  name: {
                    value: lastWord,
                    boost: nameBoost
                  }
                }
              },
              {
                match: {
                  description: {
                    query: searchText,
                    boost: descriptionBoost
                  }
                }
              },
              {
                prefix: {
                  description: {
                    value: lastWord,
                    boost: descriptionBoost
                  }
                }
              }
            ]
          }
        }
      ],
      should: [
        {
          match_phrase_prefix: {
            name: {
              query: searchText,
              boost: nameBoost,
              slop: 5
            }
          }
            },
        {
          match_phrase_prefix: {
            description: {
              query: searchText,
              boost: descriptionBoost,
              slop: 5
            }
          }
        },
      ]
    }
  };

  let finalQuery = {
    filtered: {
      filter: {},
      query: query
    }
  };

  let search = esEngine.search({
    index: 'techdb',
    type: types.join(','),    // filter types
    body: {
      query: finalQuery
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
