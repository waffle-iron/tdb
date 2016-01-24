Organizations.attachBehaviour('river', {
  adapter: new ElasticSearchAdapter(esClient, 'techdb', 'organizations', (doc) => {
    let schema = new SimpleSchema({
      name: {
        type: String
      }
    });
    schema.clean(doc);
    return doc;
  })
});

Projects.attachBehaviour('river', {
  adapter: new ElasticSearchAdapter(esClient, 'techdb', 'projects', (doc) => {
    let schema = new SimpleSchema({
      name: {
        type: String
      },
      description: {
        type: String
      }
    });
    schema.clean(doc);
    return doc;
  })
});


Technologies.attachBehaviour('river', {
  adapter: new ElasticSearchAdapter(esClient, 'techdb', 'technologies', (doc) => {
    let schema = new SimpleSchema({
      name: {
        type: String
      },
      description: {
        type: [Schemas.Description]
      }
    });

    schema.clean(doc);
    let publishedDescription = doc.getPublishedDescription();
    doc.description = TagStripper.strip(publishedDescription.longText);
    return doc;
  })
});
