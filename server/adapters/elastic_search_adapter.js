/**
 * ElasticSearchAdapter
 * must implement insertDoc, removeDoc, updateDoc
 *
 * constructor:
 * @client {elasticsearch} elastic search connection instance
 * @index {String} elastic search index
 * @type {String} elastic search type
 * @docTransformer {simpleSchema} must implement clean
 */
ElasticSearchAdapter = class ElasticSearchAdapter { // implements riverOperations
  constructor(client, index, type, docTransformer) {
    if (!client) throw new Error('Client must be specified');
    if (!index) throw new Error('Index must be specified');
    if (!type) throw new Error('Type must be specified');

    this.index = index;
    this.type = type;
    this.client = client;
    this.docTransformer = docTransformer;
  }

  insertDoc(userId, doc) {
    let finalDoc = this.docTransformer(doc);
    return this.client.index({
      index: this.index,
      type: this.type,
      id: doc._id,
      body: finalDoc
    });
  }

  removeDoc(userId, doc) {
    return this.client.delete({
      index: this.index,
      type: this.type,
      id: doc._id
    });
  }

  updateDoc(userId, doc) {
    let finalDoc = this.docTransformer(doc);
    return this.client.update({
      index: this.index,
      type: this.type,
      id: doc._id,
      body: {
        doc: finalDoc
      }
    });
  }
};