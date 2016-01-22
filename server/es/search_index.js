let esUrl = Meteor.settings.ES_URL;
if (!esUrl) throw new Error('Please config ES_URL on settings.json');

let elasticsearch = Meteor.npmRequire('elasticsearch');
let asyncEsClient = new elasticsearch.Client({
  host: esUrl
});
let esClient = Async.wrap(asyncEsClient, ['index', 'search', 'update', 'delete']);

// riverOperations interface
//  insertDoc
//  removeDoc
//  updateDoc


class ElasticSearchAdapter { // implements riverOperations
  constructor(client, index, type, docTransformer) {
    if (!client) throw new Error('Client must be specified');
    if (!index) throw new Error('Index must be specified');
    if (!type) throw new Error('Type must be specified');

    this.index = index;
    this.type = type;
    this.client = client;
    this.docTransformer = docTransformer;
  }

  transformDoc(doc) {
    if (this.docTransformer && typeof this.docTransformer.clean === 'function') {
      this.docTransformer.clean(doc);
    }
    return doc;
  }
  insertDoc(id, doc) {
    this.transformDoc(doc);
    return this.client.index({
      index: this.index,
      type: this.type,
      id: id,
      body: doc
    });
  }

  removeDoc(id) {
    return this.client.delete({
      index: this.index,
      type: this.type,
      id: id
    });
  }

  updateDoc(id, doc) {
    this.transformDoc(doc);
    return this.client.update({
      index: this.index,
      type: this.type,
      id: id,
      body: {
        doc: doc
      }
    });
  }
}

class ElasticSearchEngine {
  constructor(client) {
    this.client = client;
  }

  search(options) {
    let searchResponse = this.client.search(options);
    let results = _.map(searchResponse.hits.hits, function(hit) {
      return {
        _id: hit._id,
        type: hit._type,
        score: hit._score,
        doc: hit._source
      };
    });

    return {
      results: results,
      total: searchResponse.hits.total,
      took: searchResponse.took
    };
  }
}


CollectionBehaviours.define('river', function(options) {
  let collection = this.collection;
  let defaultOptions = _.defaults(options, this.options, defaultOptions);
  let adapter = options.adapter;
  if (!adapter) throw new Error('Must pass an adapter');

  // Behaviour logic goes here
  collection.after.insert((userId, doc) => {
    adapter.insertDoc(doc._id, doc);
  });

  collection.after.update((userId, doc) => {
    adapter.updateDoc(doc._id, doc);
  });

  collection.after.remove((userId, doc) => {
    adapter.removeDoc(doc._id);
  });
});


let SearchableTechFields = new SimpleSchema({
  name: {
    type: String
  },
  synonyms: {
    type: [String]
  },
  tags: {
    type: [String]
  },
 description: {
    type: [Schemas.Description]
  }
});

let SearchableOrgFields = new SimpleSchema({
  name: {
    type: String
  },
  synonyms: {
    type: [String]
  },
  description: {
    type: [Schemas.Description]
  }
});

let SearchableProjectsFields = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  tags: {
    type: [String]
  }
});

Technologies.attachBehaviour('river', {
  adapter: new ElasticSearchAdapter(esClient, 'techdb', 'technologies', SearchableTechFields)
});

Organizations.attachBehaviour('river', {
  adapter: new ElasticSearchAdapter(esClient, 'techdb', 'organizations', SearchableOrgFields)
});


Projects.attachBehaviour('river', {
  adapter: new ElasticSearchAdapter(esClient, 'techdb', 'projects', SearchableProjectsFields)
});


esEngine = new ElasticSearchEngine(esClient);
