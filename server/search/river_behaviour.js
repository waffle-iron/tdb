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
