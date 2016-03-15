Template.search.events({
  'click .load-more' (e, t) {
    // Inc size by 8
    t.size.set(t.size.get() + 8);
  },

  'input [name="search"]' (e, t) {
    // Set size to default when user starts a new search
    t.size.set(8);
  },
})

Template.search.helpers({
  results() {
    _.each(Template.instance().changedBriefCards, (t) => {
      if (t) {
        t.state.set(null);
      }
    });
    Template.instance().changedBriefCards = [];
    let results = SearchSources.globalSearch.getTransformedData();

    let scores = results.map((r) => r._score);
    console.log(scores);

    return results;
  },
  getOptions() {
    let t = Template.instance();
    return function() {
      let entityFilter = Session.get('entityFilter') || [];
      return {
        size: t.size.get(),
        types: entityFilter
      };
    };
  },

  hasMoreResults() {
    let t = Template.instance();
    let metadata = SearchSources.globalSearch.getMetadata();
    return metadata && metadata.total > t.size.get();
  }
});

Template.search.onCreated(function() {
  this.changedBriefCards = [];
  this.size = new ReactiveVar(8);
});
