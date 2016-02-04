Template.projectsDashboard.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('projectsEntry', {id: rowData._id});
    });
  }
});
