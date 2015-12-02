let projectsRoutes = FlowRouter.group({
  prefix: '/projects',
  name: 'Projects'
});

projectsRoutes.route('/', {
  name: 'projects.index',
  title: 'Projects',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'projects'});
  }
});


projectsRoutes.route('/add', {
  name: 'projects.add',
  parent: 'projects.index',
  title: 'Add',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'projectsAdd'});
  },
});

projectsRoutes.route('/:id/view', {
  name: 'projects.view',
  parent: 'projects.index',
  title() {
    let project = Projects.findOne({_id: FlowRouter.getParam('id')});
    return project && project.name;
  },
  subscriptions(params) {
    this.register('project', subs.subscribe('project', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {main: 'projectsView'});
  },
});


projectsRoutes.route('/:id/edit', {
  name: 'projects.edit',
  parent: 'projects.view',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'projectsEdit'});
  },
  subscriptions(params) {
    this.register('project', subs.subscribe('project', params.id));
  }
});

