
Template.technologiesDashboard.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('technologies.view', {id: rowData._id});
    });
  }
});


Template.technologiesDashboard.helpers({

});
