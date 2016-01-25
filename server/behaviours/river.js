/**
 * river
 * simply hooks all mongo operations and drives them to an adapter
 *
 */
CollectionBehaviours.define('river', function(options) {
  let collection = this.collection;
  let defaultOptions = _.defaults(options, this.options, defaultOptions);
  let adapters = options.adapters || [];
  if (!adapters.length) throw new Error('Must pass at least one adapter');

  // Behaviour logic goes here
  collection.after.insert(function(userId, doc) {
    let transformedDoc = this.transform();
    _.each(adapters, function(adapter) {
      adapter.insertDoc(userId, transformedDoc);
    });
  });

  collection.after.update(function(userId, doc, fieldNames, modifier) {
    let transformedDoc = this.transform();
    _.each(adapters, function(adapter) {
      adapter.updateDoc(userId, transformedDoc, fieldNames, modifier);
    });
  });

  collection.after.remove((userId, doc) => {
    _.each(adapters, function(adapter) {
      adapter.removeDoc(userId, doc);
    });
  });
});
