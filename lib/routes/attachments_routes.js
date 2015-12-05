let attachmentsRoutes = FlowRouter.group({
  prefix: '/attachments',
  name: 'attachments'
});

attachmentsRoutes.route('/', {
  name: 'attachments.index',
  title: 'attachments',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'attachments'});
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

attachmentsRoutes.route('/:id/view', {
  name: 'attachments.view',
  parent: 'attachments.index',
  title() {
    let attachment = attachments.findOne({_id: FlowRouter.getParam('id')});
    return attachment && attachment.name;
  },
  subscriptions(params) {
    this.register('attachment', subs.subscribe('attachment', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {main: 'attachmentsView'});
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

