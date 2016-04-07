function isScrollOnBottom() {
  return window.innerHeight + window.scrollY >= 0.8 * document.body.scrollHeight;
  //  return $(window).scrollTop() === $(document).height() - $(window).height();*/
}

const DEFAULT_SIZE = 5;
const DEBOUNCE_TIME = 50;

Template.searchSourceDisplay.onCreated(function() {
  this.size = new ReactiveVar(DEFAULT_SIZE);
  this.loaded = new ReactiveVar(0);

  this.increaseSize = (size) => {
    this.size.set(this.size.get() + size);
  };

  this.autorun(() => {
    let metadata = SearchSources.globalSearch.getMetadata();
<<<<<<< HEAD
    if (!metadata || !metadata.total) return this.size.set(DEFAULT_SIZE);
=======
    if (!metadata || !metadata.total) this.size.set(DEFAULT_SIZE);
>>>>>>> 67a8128... Masonry search enchancements
    let hasMoreData = metadata && metadata.total > this.size.get();
    if (this.loaded.get() === this.size.get()) {
      if (isScrollOnBottom()) {
        this.increaseSize(DEFAULT_SIZE);
      }
    }
  });

<<<<<<< HEAD
  window.addEventListener('scroll', _.debounce(() => {
    if (this.loaded.get() === this.size.get()) {
      if (isScrollOnBottom()) {
        this.increaseSize(DEFAULT_SIZE);
      }
    }
  }), DEBOUNCE_TIME);
});

=======
  let countScroll = 0;
  window.addEventListener('scroll', _.debounce(() => {
    if (isScrollOnBottom()) {
      console.log('Increase from scroll ', countScroll++);
      this.increaseSize(DEFAULT_SIZE);
    }
  }, 50));

  this.size.set(DEFAULT_SIZE);
});

Template.searchSourceDisplay.events({
  'input [name="search"]': (e, t) => {
    //t.size.set(DEFAULT_SIZE);
  }
});
>>>>>>> 67a8128... Masonry search enchancements

Template.searchSourceDisplay.helpers({
  results: () => Template.instance().data.source.getTransformedData(),
  isLoading: () => Template.instance().data.source.getStatus().loading,
<<<<<<< HEAD
  onLayoutComplete() {
    let t = Template.instance();
    return (length) => {
      t.loaded.set(length);
    };
  },
=======
>>>>>>> 67a8128... Masonry search enchancements
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
