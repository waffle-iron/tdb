Template.projects.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('projects.view', {id: rowData._id});
    });
  }
});