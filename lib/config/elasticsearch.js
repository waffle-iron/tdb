ElasticSearch = Meteor.npmRequire('elasticsearch');

// create the client
EsClientSource = new ElasticSearch.Client({
  host: 'localhost:9200'
});

// make it fiber aware 
EsClient = Async.wrap(EsClientSource, ['index', 'search']);
