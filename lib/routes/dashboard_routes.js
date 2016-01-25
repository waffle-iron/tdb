let dashboardRoutes = FlowRouter.group({
  prefix: '/dashboard',
  name: 'Search'
});

dashboardRoutes.route('/', {
  name: 'mainDashboard.index',
  title: 'Search',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'mainDashboard'});
  }
});
