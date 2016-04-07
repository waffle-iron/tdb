function isScrollOnBottom() {
  return $(window).scrollTop() === $(document).height() - $(window).height();
}

const DEFAULT_SIZE = 5;
const INCREASE_DELAY = 1000;
Template.searchSourceDisplay.onCreated(function() {
  this.size = new ReactiveVar(DEFAULT_SIZE);
  this.isLoading = new ReactiveVar(false);

  this.increaseSize = (size) => {
    this.size.set(this.size.get() + size);
  };

  let countAutorun = 0;
  this.autorun(() => {
    let metadata = SearchSources.globalSearch.getMetadata();
    let hasMoreData = metadata && metadata.total > this.size.get();

    Meteor.setTimeout(() => {
      if (hasMoreData) {
        if (isScrollOnBottom()) {
          console.log('Increase from autorun ', countAutorun++);
          this.increaseSize(DEFAULT_SIZE);
        }
      }
    }, INCREASE_DELAY);
  });

  let countScroll = 0;
  window.addEventListener('scroll', _.throttle(() => {
    if (isScrollOnBottom()) {
      console.log('Increase from scroll ', countScroll++);
      this.increaseSize(DEFAULT_SIZE);
    }
  }, INCREASE_DELAY));
});

Template.searchSourceDisplay.events({
  'input [name="search"]': (e, t) => {
    t.size.set(DEFAULT_SIZE);
  }
});

Template.searchSourceDisplay.helpers({
  results: () => Template.instance().data.source.getTransformedData(),
  isLoading: () => {
    let metadata = SearchSources.globalSearch.getMetadata();
    let hasMoreData = metadata && metadata.total > Template.instance().size.get();
    return isScrollOnBottom() && hasMoreData;
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
