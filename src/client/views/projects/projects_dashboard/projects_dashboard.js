Template.projectsDashboard.events({
  // 'click tbody > tr': function(event) {
  //   handleTableClick(event, (rowData) => {
  //     FlowRouter.go('projects.edit', {
  //       id: rowData._id
  //     });
  //   });
  // }
});

Template.projectsDashboard.helpers({
  projectSelector() {
    return {
      collection: 'projects'
    };
  }
});
