let organizationsRoutes = FlowRouter.group({
  prefix: '/organizations',
  name: 'Organizations'
});

organizationsRoutes.route('/', {
  name: 'organizations.index',
  title: 'Organizations',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'organizations'});
  }
});


organizationsRoutes.route('/add', {
  name: 'organizations.add',
  parent: 'organizations.index',
  title: 'Add',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'organizationsAdd'});
  },
});

organizationsRoutes.route('/:id/view', {
  name: 'organizations.view',
  parent: 'organizations.index',
  title() {
    let organization = Organizations.findOne({_id: FlowRouter.getParam('id')});
    return organization && organization.name;
  },
  subscriptions(params) {
    this.register('organization', subs.subscribe('organization', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {main: 'organizationsView'});
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

