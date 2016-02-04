let usersRoutes = FlowRouter.group({
  prefix: '/users',
});

usersRoutes.route('/', {
  name: 'usersDashboard',
  title: 'Users Dashboard',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'usersDashboard'
    });
  },
});

usersRoutes.route('/invite', {
  name: 'usersInvite',
  parent: 'usersDashboard',
  title: 'Invite User',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'usersInvite'
    });
  },
});

usersRoutes.route('/:id/entry', {
  name: 'usersEntry',
  parent: 'usersDashboard',
  title() {
    let user = Meteor.users.findOne({
      _id: FlowRouter.getParam('id')
    });
    return user && user.identification();
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'usersEntry'
    });
  }
});

usersRoutes.route('/:id/edit', {
  name: 'users.edit',
  parent: 'users.view',
  title: 'Editar',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'usersEdit'
    });
  },
  subscriptions(params) {
    this.register('user', subs.subscribe('user', params.id));
  }
});
