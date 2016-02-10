let projectsRoutes = FlowRouter.group({
  prefix: '/projects',
  name: 'Projects'
});

projectsRoutes.route('/', {
  name: 'projectsDashboard',
  title: 'Projects Dashboard',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'projectsDashboard'
    });
  }
});


projectsRoutes.route('/add', {
  name: 'projectsAdd',
  parent: 'projectsDashboard',
  title: 'New Project',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'projectsAdd'
    });
  },
});

projectsRoutes.route('/:id/entry', {
  name: 'projectsEntry',
  parent: 'projectsDashboard',
  title() {
    let project = Projects.findOne({
      _id: FlowRouter.getParam('id')
    });
    return project && project.name;
  },
  subscriptions(params) {
    this.register('project', subs.subscribe('project', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'projectsEntry'
    });
  },
});


projectsRoutes.route('/:id/edit', {
  name: 'projectsEdit',
  parent: 'projectsEntry',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'projectsEdit'
    });
  },
  subscriptions(params) {
    this.register('project', subs.subscribe('project', params.id));
  }
});
