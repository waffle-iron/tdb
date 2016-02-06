let attachmentsRoutes = FlowRouter.group({
  prefix: '/attachments',
  name: 'attachments'
});

attachmentsRoutes.route('/index', {
  name: 'attachments.index',
  title: 'attachments',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'attachments'});
  }
});

attachmentsRoutes.route('/', {
  name: 'attachmentsDashboard',
  title: 'Attachments Dashboard',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'attachmentsDashboard'
    });
  }
});

attachmentsRoutes.route('/add', {
  name: 'attachments.add',
  parent: 'attachments.index',
  title: 'Add',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'attachmentsAdd'});
  },
});

attachmentsRoutes.route('/:id/entry', {
  name: 'attachments.entry',
  parent: 'attachments.index',
  title() { 
    let attachment = Attachments.findOne({
      _id: FlowRouter.getParam('id')
    });
    return attachment && attachment.name;
  },  
  subscriptions(params) {
    this.register('attachments.single', subs.subscribe('attachments.single', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'attachmentsEntry'
    });
  },
});

attachmentsRoutes.route('/:id/edit', {
  name: 'attachments.edit',
  parent: 'attachments.view',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'attachmentsEdit'});
  },
  subscriptions(params) {
    this.register('attachment', subs.subscribe('attachment', params.id));
  }
});

