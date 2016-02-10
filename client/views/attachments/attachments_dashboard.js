Template.attachmentsDashboard.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('attachments.entry', {id: rowData._id});
    });
  }
});
