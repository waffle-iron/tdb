Template.projectsDashboardStat.onCreated(function() {
  this.subscribe('projects-status-counter');
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
  }
});

