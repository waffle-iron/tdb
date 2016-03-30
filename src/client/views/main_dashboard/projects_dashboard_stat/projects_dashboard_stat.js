Template.projectsDashboardStat.onCreated(function() {
  this.subscribe('projects-status-counter');
  this.subscribe('last-project-added');
});

Template.projectsDashboardStat.helpers({
  openCount() {
    return Counts.get('projects-open');
  },
  prospectCount() {
    return Counts.get('projects-prospect');
  },
  closedCount() {
    return Counts.get('projects-closed');
  },
  lastProjectAdded() {
    return Projects.findOne({}, {
      sort: {
        createdAt: -1
      },
      limit: 1
    });
  }
});
