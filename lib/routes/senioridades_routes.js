let senioridadesRoutes = FlowRouter.group({
  prefix: '/senioridades',
  name: 'Senioridades'
});

senioridadesRoutes.route('/', {
  name: 'senioridades.index',
  title: 'Senioridades',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'senioridades'});
  }
});


senioridadesRoutes.route('/add', {
  name: 'senioridades.add',
  parent: 'senioridades.index',
  title: 'Adicionar',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'senioridadesAdd'});
  },
});

senioridadesRoutes.route('/:id/view', {
  name: 'senioridades.view',
  parent: 'senioridades.index',
  title() {
    let senioridade = Senioridades.findOne({_id: FlowRouter.getParam('id')});
    return senioridade && senioridade.nome;
  },
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'senioridadesView'});
  },
});


senioridadesRoutes.route('/:id/edit', {
  name: 'senioridades.edit',
  parent: 'senioridades.view',
  title: 'Editar',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'senioridadesEdit'});
  },
  subscriptions(params) {
    this.register('senioridade', subs.subscribe('senioridade', params.id));
  }
});

