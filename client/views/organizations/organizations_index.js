Template.organizations.onCreated(function() {

});

Template.organizations.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('organizations.view', {id: rowData._id});
    });
  }
});

