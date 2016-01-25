Template.recentUpdates.helpers({
  logs() {
    return Logs.find(this.selector, {
      sort: {
        createdAt: -1
      }
    });
  }
});
