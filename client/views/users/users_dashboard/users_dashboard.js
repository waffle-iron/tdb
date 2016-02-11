Template.usersDashboard.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('users.entry', {id: rowData._id});
    });
  }
});
