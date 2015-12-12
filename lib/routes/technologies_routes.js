let technologiesRoutes = FlowRouter.group({
  prefix: '/technologies',
  name: 'Technologies'
});

technologiesRoutes.route('/', {
  name: 'technologies.index',
  title: 'Technologies',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'technologies'});
  }
});


technologiesRoutes.route('/add', {
  name: 'technologies.add',
  parent: 'technologies.index',
  title: 'Add',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'technologiesAdd'});
  },
});

technologiesRoutes.route('/:id/view', {
  name: 'technologies.view',
  parent: 'technologies.index',
  title() {
    let technologie = Technologies.findOne({_id: FlowRouter.getParam('id')});
    return technologie && technologie.name;
  },
  subscriptions(params) {
    this.register('technology', subs.subscribe('technology', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {main: 'technologiesView'});
  },
});


technologiesRoutes.route('/:id/edit', {
  name: 'technologies.edit',
  parent: 'technologies.view',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'technologiesEdit'});
  },
  subscriptions(params) {
    this.register('technology', subs.subscribe('technology', params.id));
  }
});

