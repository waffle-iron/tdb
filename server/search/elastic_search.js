// read meteor settings to get elastic search URL
let esUrl = Meteor.settings.ES_URL;
if (!esUrl) throw new Error('Please config ES_URL on settings.json');

// instantiate elasticsearch from npm
let elasticsearch = Meteor.npmRequire('elasticsearch');
let asyncEsClient = new elasticsearch.Client({
  host: esUrl
});

//  wraps elasticsearch from npm on sync methods
esClient = Async.wrap(asyncEsClient, ['index', 'search', 'update', 'delete']);


/**
 * ElasticSearchEngine
 * has search functionality and returns results in a better way
 *
 * constructor:
 * @client {elasticsearch} elastic search connection instance
 */
ElasticSearchEngine = class ElasticSearchEngine {
  constructor(client) {
    this.client = client;
  }
  search(options) {
    let searchResponse = this.client.search(options);
    let results = _.map(searchResponse.hits.hits, function(hit) {
      return _.extend(hit._source, {
        _id: hit._id,
        _type: hit._type,
        _score: hit._score,
        _highlight: hit.highlight
      });
    });

    return {
      results: results,
      total: searchResponse.hits.total,
      took: searchResponse.took
    };
  }
};
