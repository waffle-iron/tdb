Template.usersDashboard.helpers({
  users() {
    return SearchSources.userSearch.getData();
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
  }
});
