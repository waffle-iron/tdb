Template.search.onCreated(function() {
  this.changedBriefCards = [];
});

Template.search.helpers({
  results() {
    _.each(Template.instance().changedBriefCards, (t) => {
      if (t) {
        t.state.set(null);
      }
    });
    Template.instance().changedBriefCards = [];
    let results = SearchSources.globalSearch.getTransformedData();
    return results;
  },
  getOptions() {
    return function() {
      let entityFilter = Session.get('entityFilter') || [];
      return {
        types: entityFilter
      };
    };
  }
});
