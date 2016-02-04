let dashboardRoutes = FlowRouter.group({
  prefix: '/dashboard',
  name: 'Dashboard'
});

dashboardRoutes.route('/', {
  name: 'mainDashboard.index',
  title: 'Dashboard',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'mainDashboard'});
  }
});
