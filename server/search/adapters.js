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

  insertDoc(id, doc) {
    let finalDoc = this.docTransformer(doc);
    return this.client.index({
      index: this.index,
      type: this.type,
      id: id,
      body: finalDoc
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
    let finalDoc = this.docTransformer(doc);
    return this.client.update({
      index: this.index,
      type: this.type,
      id: id,
      body: {
        doc: finalDoc
      }
    });
  }
};
