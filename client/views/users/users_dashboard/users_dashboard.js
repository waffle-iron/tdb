Template.usersDashboard.helpers({
  users() {
    let results = SearchSources.userSearch.getTransformedData();
    console.log(results);
    return results;
  },
  userRecentUpdatesSelector() {
    return {
      collection: 'users'
    };
  },
  getLink() {
    return FlowRouter.path('users.entry', {
      id: this._id
    });
  },
  fullName() {
    return this['profile.fullName'];
  }
});
