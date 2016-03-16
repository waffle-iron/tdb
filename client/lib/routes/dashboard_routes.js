let dashboardRoutes = FlowRouter.group({
  prefix: '/dashboard',
  name: 'dashboard'
});

dashboardRoutes.route('/', {
  name: 'dashboard',
  title: 'Dashboard',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'mainDashboard'});
  }
});
