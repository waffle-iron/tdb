const ALL_COLLECTIONS_CHAR = '*';
const DEFAULT_INITIAL_COUNT = 1;
const COUNT_INCREMENT = 5;

Template.recentUpdates.helpers({
  logs() {
    let displayCount = Template.instance().data.displayCount.get();

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
  this.data.displayCount = new ReactiveVar(this.data.initialCount);
  this.data.collection = this.data.collection || ALL_COLLECTIONS_CHAR;
  this.data.counterIdentifier = 'recentUpdatesCounter-' + this.data.collection;
  this.autorun(() => {
    console.log(this.data.displayCount.get());
    this.subscribe('recentUpdates', this.data.collection, this.data.displayCount.get());
  });
});


Template.recentUpdates.events({
  'click #view-more': function(e, template) {
    let displayCount = template.data.displayCount;
    let count = Counts.get(template.data.counterIdentifier);
    let increment = count - displayCount.get() < COUNT_INCREMENT ? count - displayCount.get() : COUNT_INCREMENT;
    displayCount.set(displayCount.get() + increment);
  },
  'click #view-less': function(e, template) {
    let displayCount = template.data.displayCount;
    let increment = displayCount.get() - COUNT_INCREMENT < DEFAULT_INITIAL_COUNT ? displayCount.get() - DEFAULT_INITIAL_COUNT : COUNT_INCREMENT;
    displayCount.set(displayCount.get() - increment);
  }
});
