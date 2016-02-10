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
});

Template.attachmentsDashboard.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('attachments.entry', {id: rowData._id});
    });
  }
});

