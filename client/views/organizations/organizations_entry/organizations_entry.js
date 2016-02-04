Template.orgEntry.helpers({
  org: function() {
    let org = Organizations.findOne({
      _id: FlowRouter.getParam('id')
    });
    return org;
  },
});


Template.orgEntry.onCreated(function() {
  this.autorun(() => {
    let orgId = FlowRouter.getParam('id');
    this.subscribe('organizations.single', orgId);
  });
});
