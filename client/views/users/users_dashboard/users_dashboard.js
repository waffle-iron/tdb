Template.usersDashboard.helpers({
  users() {
    console.log(SearchSources.userSearch.getData());
    return SearchSources.userSearch.getData();
  },
  userRecentUpdatesSelector() {
    return {
      collection: 'users'
    };
  },
});
