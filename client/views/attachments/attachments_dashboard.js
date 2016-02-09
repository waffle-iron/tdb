Template.attachmentsDashboard.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('attachmentsEntry', {id: rowData._id});
    });
  }
});
