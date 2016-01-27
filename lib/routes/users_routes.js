let usersRoutes = FlowRouter.group({
  prefix: '/users',
});

usersRoutes.route('/', {
  name: 'users.index',
  title: 'Users',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'users'
    });
  },
});

usersRoutes.route('/add', {
  name: 'users.add',
  parent: 'users.index',
  title: 'Add',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'usersAdd'
    });
  },
});

usersRoutes.route('/:id/view', {
  name: 'users.view',
  parent: 'users.index',
  title() {
    let user = Meteor.users.findOne({
      _id: FlowRouter.getParam('id')
    });
    return user && user.identification();
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'usersView'
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
