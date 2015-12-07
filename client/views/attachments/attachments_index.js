Template.attachments.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('attachments.view', {id: rowData._id});
    });
  }
});