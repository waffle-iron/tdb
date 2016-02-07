let MetaInspector = Meteor.npmRequire('node-metainspector');

Meteor.methods({
  getMetadataFromUrl: function(url) {
    check(url, String);

    function fetch(url, callback) {
      let client = new MetaInspector(url, {
        timeout: 5000
      });

      client.on("fetch", function() {
        callback(null, {
          title: client.title,
          description: client.description,
          image: client.image
        });
      });

      client.on("error", function(err) {
        callback(err)
      });

      client.fetch();
    }

    let syncFetch = Async.wrap(fetch);
    return syncFetch(url)

  }
})
