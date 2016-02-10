Template.projectsDashboard.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('projects.entry', {
        id: rowData._id
      });
    });
  }
});
