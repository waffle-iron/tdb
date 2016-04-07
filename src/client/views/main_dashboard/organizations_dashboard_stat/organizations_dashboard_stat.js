Template.organizationsDashboardStat.onCreated(function() {
  this.subscribe('last-organization-added');
});

Template.organizationsDashboardStat.helpers({
  totalCount() {
    return Counts.get('docCounter-organizations');
  },  
  lastOrganizationAdded() {
    return Organizations.findOne({}, {
      sort: {
        createdAt: -1
      }
    });
  }
});

