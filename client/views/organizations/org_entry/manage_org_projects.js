Template.manageOrgProjects.helpers({
  projects() {
    return SearchSources.globalSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<b>$&</b>');
      },
      sort: {_score: -1}
    });
  },

  getOptions() {
    return {
      types: ['projects']
    };
  }
});

