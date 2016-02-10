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
  name: 'attachmentsAdd',
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
  name: 'attachmentsEdit',
  parent: 'attachmentsEntry',
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
