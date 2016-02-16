const DEFAULT_NAME_BOOST = 100;
const DEFAULT_DESCRIPTION_BOOST = 1;
const DEFAULT_NAME_FUZZINESS = 2;
const DEFAULT_DESCRIPTION_FUZZINESS = 1;


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
SearchSource.defineSource('globalSearch', function(searchText, options = {}) {
  let nameBoost = options.nameBoost || DEFAULT_NAME_BOOST;
  let nameFuzziness = options.nameFuzziness || DEFAULT_NAME_FUZZINESS;
  let descriptionBoost = options.descriptionBoost || DEFAULT_DESCRIPTION_BOOST;
  let descriptionFuzziness = options.descriptionFuzziness || DEFAULT_DESCRIPTION_FUZZINESS;
  let types = options.types || [];

  searchText = searchText.toLowerCase();
  let words = searchText.trim().split(' ');
  let lastWord = words[words.length - 1] || '';


  let query = {
    bool: {
      must: [ //  At least one must match
        {
          bool: {
            should: [ // Any of these conditions should match, the most, more relevant
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
              },
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

  let search = esClient.prettySearch({
    index: 'techdb',
    type: types.join(','), // filter types
    body: {
      size: 50,
      query: finalQuery,
      highlight: {
        pre_tags: ['<em>'],
        post_tags: ['</em>'],
        fields: {
          name: {},
          description: {}
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

const DEFAULT_USER_USERNAME_BOOST = 10;
const DEFAULT_USER_NAME_BOOST = 1;
const DEFAULT_EMAIL_BOOST = 5;
SearchSource.defineSource('userSearch', function(searchText, options = {}) {
  let nameBoost = options.nameBoost || DEFAULT_USER_NAME_BOOST;
  let usernameBoost = options.usernameBoost || DEFAULT_DESCRIPTION_BOOST;
  let emailBoost = options.emailBoost || DEFAULT_EMAIL_BOOST;
  
  searchText = searchText.toLowerCase();
  let words = searchText.trim().split(' ');
  let lastWord = words[words.length - 1] || '';

  let query = {
    bool: {
      must: [ //  At least one must match
        {
          bool: {
            should: [ // Any of these conditions should match, the most, more relevant
              {
                match: {
                  'profile.fullName': {
                    query: searchText,
                    boost: nameBoost
                  }
                }
              },
              {
                prefix: {
                  'profile.fullName': {
                    value: lastWord,
                    boost: nameBoost
                  }
                }
              },
              {
                match: {
                  username: {
                    query: searchText,
                    boost: usernameBoost
                  }
                }
              },
              {
                prefix: {
                  username: {
                    value: lastWord,
                    boost: usernameBoost
                  }
                }
              },
              {
                match: {
                  'emails.address': {
                    query: searchText,
                    boost: emailBoost
                  }
                }
              },
              {
                prefix: {
                  'emails.address': {
                    value: lastWord,
                    boost: emailBoost
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
            'profile.fullName': {
              query: searchText,
              boost: nameBoost,
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

  let search = esClient.prettySearch({
    index: 'techdb',
    type: 'users',
    body: {
      query: finalQuery,
      highlight: {
        pre_tags: ['<b>'],
        post_tags: ['</b>'],
        fields: {
          name: {},
          username: {}
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
