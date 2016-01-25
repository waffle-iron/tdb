let logRoutes = FlowRouter.group({
  prefix: '/log',
  name: 'Search'
});

logRoutes.route('/', {
  name: 'log.index',
  title: 'Search',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'log'});
  }
});