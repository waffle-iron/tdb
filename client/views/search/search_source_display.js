Template.searchSourceDisplay.events({
  'click .load-more'(e, t) {
    // Inc size by 8
    t.size.set(t.size.get() + 8);
  },

  'input [name="search"]'(e, t) {
    // Set size to default when user starts a new search
    t.size.set(8);
  },
});

Template.searchSourceDisplay.helpers({
  results() {
    return Template.instance().data.source.getTransformedData();
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
  hasMoreResults() {
    let t = Template.instance();
    let metadata = SearchSources.globalSearch.getMetadata();
    return metadata && metadata.total > t.size.get();
  },
});

Template.searchSourceDisplay.onCreated(function() {
  this.size = new ReactiveVar(8);
  $('input[name="search"]').val('l');
});
