const ALL_COLLECTIONS_CHAR = '*';

Meteor.publish('recentUpdates', function(collection, limit) {
  check(collection, String);
  check(limit, Number);

  let selector = {};
  if (collection !== ALL_COLLECTIONS_CHAR) {
    selector = {
      collection: collection
    };
  }

  Counts.publish(this, 'recentUpdatesCounter-' + collection, Logs.find(selector));


  return Logs.find(selector, {
    limit: limit,
    sort: {
      createdAt: -1
    }
  });
});

