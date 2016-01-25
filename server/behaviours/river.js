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


Organizations.attachBehaviour('river', {
  adapters: [
    new ElasticSearchAdapter(esClient, 'techdb', 'organizations', (doc) => {
      let finalDoc = _.clone(doc);

      let schema = new SimpleSchema({
        name: {
          type: String
        }
      });
      schema.clean(finalDoc);
      return finalDoc;
    }),
    new LogAdapter(Logs, Organizations, function(doc) {
      return doc.name;
    })
  ]
});

Projects.attachBehaviour('river', {
  adapters: [
    new ElasticSearchAdapter(esClient, 'techdb', 'projects', (doc) => {
      let finalDoc = _.clone(doc);
      let schema = new SimpleSchema({
        name: {
          type: String
        },
        description: {
          type: String
        }
      });
      schema.clean(finalDoc);
      return finalDoc;
    }),
    new LogAdapter(Logs, Projects, function(doc) {
      return doc.name;
    })
  ]
});


Technologies.attachBehaviour('river', {
  adapters: [
    new ElasticSearchAdapter(esClient, 'techdb', 'technologies', (doc) => {
      let finalDoc = _.clone(doc);

      let schema = new SimpleSchema({
        name: {
          type: String
        },
        description: {
          type: [Schemas.Description]
        }
      });

      schema.clean(finalDoc);
      let publishedDescription = doc.getPublishedDescription();
      if (publishedDescription && publishedDescription.longText) {
        finalDoc.description = TagStripper.strip(publishedDescription.longText);
      }else {
        delete finalDoc.description;
      }
      return finalDoc;
    }),
    new LogAdapter(Logs, Technologies, function(doc) {
      return doc.name;
    })
  ]
});
