SearchSources = {};
const SEARCH_THROTTLE = 200;
const SEARCH_OPTIONS = {
  keepHistory: false,
  localSearch: false
};
SearchSources.globalSearch = new SearchSource('globalSearch', ['name', 'description'], SEARCH_OPTIONS);
SearchSources.userSearch = new SearchSource('userSearch', ['fullName', 'username', 'email'], SEARCH_OPTIONS);

Template.searchSource.helpers({
  metadata() {
    return Template.instance().source.getMetadata();
  },
  searchStatus() {
    return Template.instance().source.getStatus();
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
  this.options = this.data.options || {};
  this.searchText = new ReactiveVar('');

  if (!this.source || !this.source instanceof SearchSource) {
    throw new Error('source must be instance of SearchSource');
  }
  this.autorun(() => {
    let opt = typeof this.options === 'function' ? this.options() : this.options;
    this.source.search(this.searchText.get(), opt);
  });
});
