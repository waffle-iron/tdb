function isScrollOnBottom() {
  return $(window).scrollTop() === $(document).height() - $(window).height();
}

const DEFAULT_SIZE = 5;
const INCREASE_DELAY = 1000;
const DEBOUNCE_TIME = 50;
Template.searchSourceDisplay.onCreated(function() {
  this.size = new ReactiveVar(DEFAULT_SIZE);
  this.loaded = new ReactiveVar(0);
  this.isLoading = new ReactiveVar(false);

  this.increaseSize = (size) => {
    this.size.set(this.size.get() + size);
  };

  this.autorun(() => {
    let metadata = SearchSources.globalSearch.getMetadata();
    let hasMoreData = metadata && metadata.total > this.size.get();
    if (this.loaded.get() === this.size.get()) {
      if (isScrollOnBottom()) {
        this.increaseSize(DEFAULT_SIZE);
      }
    }
  });

  window.addEventListener('scroll', _.debounce(() => {
    if (this.loaded.get() === this.size.get()) {
      if (isScrollOnBottom()) {
        this.increaseSize(DEFAULT_SIZE);
      }
    }
  }), DEBOUNCE_TIME);
});

Template.searchSourceDisplay.events({
  'input [name="search"]': (e, t) => {
    t.size.set(DEFAULT_SIZE);
  }
});

Template.searchSourceDisplay.helpers({
  results: () => Template.instance().data.source.getTransformedData(),
  isLoading: () => Template.instance().data.source.getStatus().loading,
  onLayoutComplete() {
    let t = Template.instance();
    return (length) => {
      t.loaded.set(length);
    };
  },
  options() {
    let t = Template.instance();
    return function() {
      let types;

      // If is a function that returns the array of entities
      if (typeof t.data.types === 'function') {
        types = t.data.types();
      } else {
        // If is an array like "attachments, organizations", mount the array
        types = t.data.types.split(',').map(type => type.trim());
      }

      if (!Array.isArray(types)) {
        throw new Error('types should be an array');
      }

      return {
        size: t.size.get(),
        types: types
      };
    };
  },
});
