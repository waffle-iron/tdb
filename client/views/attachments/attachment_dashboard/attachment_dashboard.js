Template.attachmentsDashboard.helpers({
  getOptions: function() {
    return {
      types: ['attachments']
    };
  },
  attachments: function() {
    return SearchSources.globalSearch.getTransformedData();
  },
  attachmentSelector: function() {
    return {
      collection: 'attachments'
    };
  },
})
