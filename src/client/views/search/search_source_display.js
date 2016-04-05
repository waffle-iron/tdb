function isScrollOnBottom() {
  return $(window).scrollTop() === $(document).height() - $(window).height();
}

const DEFAULT_SIZE = 10;
Template.searchSourceDisplay.onCreated(function() {
  this.size = new ReactiveVar(DEFAULT_SIZE);
  this.isLoading = new ReactiveVar(false);
  this.increaseSize = (size) => this.size.set(this.size.get() + size);

  window.addEventListener('scroll',
    _.throttle(() => isScrollOnBottom() && this.increaseSize(DEFAULT_SIZE), 50));

  this.autorun(() => {
    let metadata = SearchSources.globalSearch.getMetadata();
    this.isLoading.set(metadata && metadata.total > this.size.get() && isScrollOnBottom());
  });
});

Template.searchSourceDisplay.onDestroyed(function() {
  window.removeEventListener('scroll');
});

Template.searchSourceDisplay.events({
  'input [name="search"]': (e, t) => t.size.set(DEFAULT_SIZE)
});

Template.searchSourceDisplay.helpers({
  results: () => Template.instance().data.source.getTransformedData(),
  isLoading: () => Template.instance().isLoading.get(),
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
