let searchRoutes = FlowRouter.group({
  prefix: '/search',
  name: 'Search'
});

searchRoutes.route('/', {
  name: 'search',
  title: 'Search',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'search'});
  }
});
