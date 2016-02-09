let organizationsRoutes = FlowRouter.group({
  prefix: '/organizations',
  name: 'Organizations'
});

organizationsRoutes.route('/', {
  name: 'organizationsDashboard',
  title: 'Organizations Dashboard',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'organizationsDashboard'
    });
  }
});


organizationsRoutes.route('/add', {
  name: 'organizationsAdd',
  parent: 'organizationsDashboard',
  title: 'New Organization',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'organizationsAdd'
    });
  },
});

organizationsRoutes.route('/:id/entry', {
  name: 'organizationsEntry',
  parent: 'organizationsDashboard',
  title() {
    let organization = Organizations.findOne({
      _id: FlowRouter.getParam('id')
    });
    return organization && organization.name;
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'organizationsEntry'
    });
  },
});


organizationsRoutes.route('/:id/edit', {
  name: 'organizationsEdit',
  parent: 'organizationsEntry',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'organizationsEdit'
    });
  },
  subscriptions(params) {
    this.register('organization', subs.subscribe('organization', params.id));
  }
});
