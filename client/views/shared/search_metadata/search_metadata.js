const SEARCH_STATUS = {
  LOADING: 'loading',
  ERROR: 'error',
  DONE: 'done'
}

Template.searchMetadata.events({
  'keyup #search-url': function(e, t) {
    let url = e.target.value;

    t.searchStatus.set(SEARCH_STATUS.LOADING);
    Meteor.call('getMetadataFromUrl', url, function(err, res) {
      if (err) {
        t.searchStatus.set(SEARCH_STATUS.ERROR);
        console.log('Error fetching metadata...');
      } else {
        t.searchStatus.set(SEARCH_STATUS.DONE);
        Session.set('attachment', {
          title: res.title,
          description: res.description,
          thumbnail: res.image
        });
      }
    });
  }
})

Template.searchMetadata.helpers({
  done: function() {
    return Template.instance().searchStatus.get() == SEARCH_STATUS.DONE;
  },
  loading: function() {
    return Template.instance().searchStatus.get() == SEARCH_STATUS.LOADING;
  },
  error: function() {
    return Template.instance().searchStatus.get() == SEARCH_STATUS.ERROR;
  }
});

Template.searchMetadata.onCreated(function() {
  this.searchStatus = new ReactiveVar(SEARCH_STATUS.DONE);
});
