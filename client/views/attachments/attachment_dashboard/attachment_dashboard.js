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

  imageUrl: function() {
    let img = $.cloudinary.image(this.imageUrl, {
      width: 600,
      height: 400,
      crop: 'fill',
      type: 'fetch'
    }); 
    return img[0].src;
  }


});

Template.attachmentsDashboard.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('attachments.entry', {
        id: rowData._id
      });
    });
  }
});
