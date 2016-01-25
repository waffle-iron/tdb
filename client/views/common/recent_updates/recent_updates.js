const ALL_COLLECTIONS_CHAR = '*';
const DEFAULT_INITIAL_COUNT = 1;
const DEFAULT_COUNT_INCREMENT = 5;
const COUNTER_PREFIX = 'recentUpdatesCounter-';

Template.recentUpdates.helpers({
  logs() {
    let displayCount = Template.instance().data.displayCount.get();

    if (displayCount === 0) {
      return [];
    }

    let selector = {};
    if (this.collection !== ALL_COLLECTIONS_CHAR) {
      selector = {
        collection: this.collection
      };
    }

    return Logs.find(selector, {
      sort: {
        createdAt: -1
      },
      limit: displayCount
    });
  },
  displayCount() {
    return this.displayCount.get();
  },
  totalCount() {
    return Counts.get(this.counterIdentifier);
  }
});

Template.recentUpdates.onCreated(function() {
  this.data.initialCount = this.data.initialCount || DEFAULT_INITIAL_COUNT;
  this.data.countIncrement = this.data.countIncrement || DEFAULT_COUNT_INCREMENT;
  this.data.collection = this.data.collection || ALL_COLLECTIONS_CHAR;
  this.data.counterIdentifier = COUNTER_PREFIX + this.data.collection;

  this.data.displayCount = new ReactiveVar(this.data.initialCount);

  this.autorun(() => {
    let displayCount = this.data.displayCount;

    if (Counts.has(this.data.counterIdentifier)) { //  if I have the total amount of documents
      //  upper bound
      if (this.data.displayCount.get() > Counts.get(this.data.counterIdentifier)) {
        return this.data.displayCount.set(Counts.get(this.data.counterIdentifier));
      }
      //  lower bound
      if (this.data.displayCount.get() < 0) {
        this.data.displayCount.set(0);
      }
      this.subscribe('recentUpdates', this.data.collection, this.data.displayCount.get());
    }else {  // if I don't have, subscribe with limit 0, so I can get the counter cursor
      this.subscribe('recentUpdates', this.data.collection, 0);
    }
  });
});


Template.recentUpdates.events({
  'click #view-more': function(e, template) {
    let templateData = template.data;
    /*
    let displayCount = templateData.displayCount;
    let count = Counts.get(templateData.counterIdentifier);
    let increment = count - displayCount.get() < templateData.countIncrement ?
      count - displayCount.get() : templateData.countIncrement;
    */
    templateData.displayCount.set(templateData.displayCount.get() + templateData.countIncrement);
  },
  'click #view-less': function(e, template) {
    let templateData = template.data;
    /*
    let displayCount = templateData.displayCount;
    let increment = displayCount.get() - templateData.countIncrement < templateData.initialCount ?
      displayCount.get() - templateData.initialCount : templateData.countIncrement;
    */
    templateData.displayCount.set(templateData.displayCount.get() - templateData.countIncrement);
  }
});
