let projectsRoutes = FlowRouter.group({
  prefix: '/projects',
  name: 'Projects'
});

projectsRoutes.route('/', {
  name: 'projects.dashboard',
  title: 'Projects',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'projectsDashboard',
      btnText: 'Create new Project',
      btnLink: 'projects.add',      
    });
  }
});


projectsRoutes.route('/add', {
  name: 'projects.add',
  parent: 'projects.dashboard',
  title: 'New Project',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'projectsAdd'
    });
  },
});

// projectsRoutes.route('/:id/entry', {
//   name: 'projects.entry',
//   parent: 'projects.dashboard',
//   title() {
//     let project = Projects.findOne({
//       _id: FlowRouter.getParam('id')
//     });
//     return project && project.name;
//   },
//   action() {
//     BlazeLayout.render('defaultLayout', {
//       main: 'projectsEntry'
//     });
//   },
// });


projectsRoutes.route('/:id/edit', {
  name: 'projects.edit',
  parent: 'projects.entry',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'projectsEdit'
    });
  },
});
