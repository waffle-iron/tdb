Template.usersDashboard.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('users.view', {id: rowData._id});
    });
  }
});
