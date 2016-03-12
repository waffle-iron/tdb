let technologiesRoutes = FlowRouter.group({
  prefix: '/technologies',
  name: 'Technologies'
});

technologiesRoutes.route('/', {
  name: 'technologies.dashboard',
  title: 'Technologies Dashboard',
  btnText: 'Create new Technology',
  btnLink: 'technologies.add',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'technologiesDashboard'
    });
  }
});


technologiesRoutes.route('/add', {
  name: 'technologies.add',
  parent: 'technologies.dashboard',
  title: 'New Technology',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'technologiesAdd'
    });
  },
});

technologiesRoutes.route('/:id/entry', {
  name: 'technologies.entry',
  parent: 'technologies.dashboard',
  title() {
    let technologie = Technologies.findOne({
      _id: FlowRouter.getParam('id')
    });
    return technologie && technologie.name;
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'technologiesEntry'
    });
  },
});


technologiesRoutes.route('/:id/edit', {
  name: 'technologies.edit',
  parent: 'technologies.entry',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'technologiesEdit'
    });
  }
});

technologiesRoutes.route('/import', {
  name: 'technologies.import',
  parent: 'technologies.dashboard',
  title: 'Import from CSV',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'technologiesImport'
    });
  }
});
