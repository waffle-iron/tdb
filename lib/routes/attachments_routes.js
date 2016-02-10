let attachmentsRoutes = FlowRouter.group({
  prefix: '/attachments',
  name: 'attachments'
});

attachmentsRoutes.route('/', {
  name: 'attachments.dashboard',
  title: 'Attachments Dashboard',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'attachmentsDashboard'
    });
  }
});

attachmentsRoutes.route('/add', {
  name: 'attachments.add',
  parent: 'attachments.dashboard',
  title: 'Add Attachment',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'attachmentsAdd'
    });
  },
});

attachmentsRoutes.route('/:id/entry', {
  name: 'attachmentsEntry',
  parent: 'attachments.dashboard',
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
  name: 'attachmentsEdit',
  parent: 'attachments.entry',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'attachmentsEdit'
    });
  },
  subscriptions(params) {
    this.register('attachment', subs.subscribe('attachment', params.id));
  }
});
