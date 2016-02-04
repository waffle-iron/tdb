let technologiesRoutes = FlowRouter.group({
  prefix: '/technologies',
  name: 'Technologies'
});

technologiesRoutes.route('/', {
  name: 'technologiesDashboard',
  title: 'Technologies Dashboard',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'technologiesDashboard'
    });
  }
});


technologiesRoutes.route('/add', {
  name: 'technologiesAdd',
  parent: 'technologiesDashboard',
  title: 'New Technology',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'technologiesAdd'
    });
  },
});

technologiesRoutes.route('/:id/entry', {
  name: 'technologiesEntry',
  parent: 'technologiesDashboard',
  title() {
    let technologie = Technologies.findOne({
      _id: FlowRouter.getParam('id')
    });
    return technologie && technologie.name;
  },
  subscriptions(params) {
    this.register('technology', subs.subscribe('technology', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'technologiesEntry'
    });
  },
});


technologiesRoutes.route('/:id/edit', {
  name: 'technologies.edit',
  parent: 'technologies.view',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'technologiesEdit'
    });
  },
  subscriptions(params) {
    this.register('technology', subs.subscribe('technology', params.id));
  }
});
