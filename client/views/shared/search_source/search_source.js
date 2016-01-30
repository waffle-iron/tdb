Template.searchSource.helpers({
  metadata() {
    return globalSearch.getMetadata();
  },
  searchStatus() {
    return globalSearch.getStatus();
  }
});


Template.searchSource.events({
  'input #search-text': _.throttle(function(e, t) {
    let el = $(e.target);
    let searchText = el.val();
    t.searchText.set(searchText);
  }, 200)
});


Template.searchSource.onCreated(function() {
  this.source = this.data.source;
  this.options = this.data.options;
  this.searchText = new ReactiveVar('');

  this.autorun(() => {
    this.source.search(this.searchText.get(), this.options);
  });
});
