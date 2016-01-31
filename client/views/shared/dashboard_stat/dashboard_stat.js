Template.dashboardStat.events({
  'click .dashboard-stat': function() {
    FlowRouter.go(Template.instance().data.link);
  }
});
