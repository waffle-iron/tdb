Template.manageOrgAttachments.helpers({
  attachments() {
    return SearchSources.globalSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '$&');
      },
      sort: {_score: -1}
    });
  },

  getOptions() {
    return {
      types: ['attachments']
    };
  }
});

