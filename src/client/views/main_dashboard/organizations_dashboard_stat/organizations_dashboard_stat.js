Template.organizationsDashboardStat.onCreated(function() {
  this.subscribe('last-organization-added');
});

Template.organizationsDashboardStat.helpers({
  lastOrganizationAdded() {
    return Organizations.findOne({}, {
      sort: {
        createdAt: -1
      }
    });
  }
});

