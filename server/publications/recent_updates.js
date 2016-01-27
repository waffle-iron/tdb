const ALL_COLLECTIONS_CHAR = '*';
const COUNTER_PREFIX = 'recentUpdatesCounter-';

Meteor.publish('recentUpdates', function(collection, limit) {
  check(collection, String);
  check(limit, Number);

  let selector = {};
  if (collection !== ALL_COLLECTIONS_CHAR) {
    selector = {
      collection: collection
    };
  }

  Counts.publish(this, COUNTER_PREFIX + collection, Logs.find(selector));


  if (limit !== 0) {
    return Logs.find(selector, {
      limit: limit,
      sort: {
        createdAt: -1
      }
    });
  }
  this.ready();
});

