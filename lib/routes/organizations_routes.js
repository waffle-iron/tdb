let organizationsRoutes = FlowRouter.group({
  prefix: '/organizations',
  name: 'Organizations'
});

organizationsRoutes.route('/', {
  name: 'organizations.dashboard',
  title: 'Organizations',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'organizationsDashboard'});
  }
});


organizationsRoutes.route('/add', {
  name: 'organizations.add',
  parent: 'organizations.dashboard',
  title: 'Add',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'organizationsAdd'});
  },
});

organizationsRoutes.route('/:id/view', {
  name: 'organizations.view',
  parent: 'organizations.dashboard',
  title() {
    let organization = Organizations.findOne({_id: FlowRouter.getParam('id')});
    return organization && organization.name;
  },
  action() {
    BlazeLayout.render('defaultLayout', {main: 'orgEntry'});
  },
});


organizationsRoutes.route('/:id/edit', {
  name: 'organizations.edit',
  parent: 'organizations.view',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'organizationsEdit'});
  },
  subscriptions(params) {
    this.register('organization', subs.subscribe('organization', params.id));
  }
});

