let cargosRoutes = FlowRouter.group({
  prefix: '/cargos',
  name: 'Cargos'
});

cargosRoutes.route('/', {
  name: 'cargos.index',
  title: 'Cargos',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'cargos'});
  },
});

cargosRoutes.route('/add', {
  name: 'cargos.add',
  parent: 'cargos.index',
  title: 'Adicionar',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'cargosAdd'});
  },
  subscriptions() {
    this.register('quickListCarreiras', subs.subscribe('quickListCarreiras'));
    this.register('quickListAreas', subs.subscribe('quickListAreas'));
  }
});

cargosRoutes.route('/:id/view', {
  name: 'cargos.view',
  parent: 'cargos.index',
  title() {
    let cargo = Cargos.findOne({_id: FlowRouter.getParam('id')});
    return cargo && cargo.nome;
  },
  action() {
    BlazeLayout.render('defaultLayout', {main: 'cargosView'});
  },
  subscriptions(params) {
    this.register('cargo', subs.subscribe('cargo', params.id));
  }
});


cargosRoutes.route('/:id/edit', {
  name: 'cargos.edit',
  parent: 'cargos.view',
  title: 'Editar',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'cargosEdit'});
  },
  subscriptions(params) {
    this.register('cargo', subs.subscribe('cargo', params.id));
    this.register('quickListAreas', subs.subscribe('quickListAreas'));
    this.register('quickListCarreiras', subs.subscribe('quickListCarreiras'));
  }  
});
