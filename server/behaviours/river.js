/**
 * river
 * simply hooks all mongo operations and drives them to an adapter
 *
 */
CollectionBehaviours.define('river', function(options) {
  let collection = this.collection;
  let defaultOptions = _.defaults(options, this.options, defaultOptions);
  let adapter = options.adapter;
  if (!adapter) throw new Error('Must pass an adapter');

  // Behaviour logic goes here
  collection.after.insert(function(userId, doc) {
    let transformedDoc = this.transform();
    console.log(transformedDoc);
    console.log(doc);
    adapter.insertDoc(doc._id, transformedDoc);
  });

  collection.after.update(function(userId, doc) {
    let transformedDoc = this.transform();
    adapter.updateDoc(doc._id, transformedDoc);
  });

  collection.after.remove((userId, doc) => {
    adapter.removeDoc(doc._id);
  });
});
