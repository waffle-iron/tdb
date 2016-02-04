Template.manageOrgTechnologies.helpers({
  technologies() {
    let results =  SearchSources.globalSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<b>$&</b>');
      },
      sort: {_score: -1}
    });
    return results;
  },
  getOptions() {
    return {
      types: ['technologies']
    };
  }
});

