Template.search.helpers({
  results() {
    return SearchSources.globalSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<b>$&</b>');
      },
      sort: {_score: -1}
    });
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
