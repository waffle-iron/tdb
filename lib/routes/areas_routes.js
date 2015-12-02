let areasRoutes = FlowRouter.group({
  prefix: '/areas',
  name: 'Áreas'
});

areasRoutes.route('/', {
  name: 'areas.index',
  title: 'Áreas',
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'areas'});
  }
});


areasRoutes.route('/add', {
  name: 'areas.add',
  parent: 'areas.index',
  title: 'Adicionar',
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'areasAdd'});
  },
  subscriptions() {
    this.register('quickListAreas', subs.subscribe('quickListAreas'));
  }
});

areasRoutes.route('/:id/view', {
  name: 'areas.view',
  parent: 'areas.index',
  title() {
    let area = Areas.findOne({_id: FlowRouter.getParam('id')});
    return area && area.nome;
  },
  action() {
    BlazeLayout.render('defaultLayout', {main: 'areasView'});
  }
});


areasRoutes.route('/:id/edit', {
  name: 'areas.edit',
  title: 'Editar',
  parent: 'areas.view',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'areasEdit'});
  },
  subscriptions(params) {
    this.register('area', subs.subscribe('area', params.id));
    this.register('quickListAreas', subs.subscribe('quickListAreas'));
  }
});
