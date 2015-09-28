var cargosRoutes = FlowRouter.group({
  prefix: '/cargos',
  name:"Cargos"
});

cargosRoutes.route('/', {
  name: 'cargos.index',
  title: "Cargos",
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'cargos'});
  },
  
});


cargosRoutes.route('/add', {
  name: 'cargos.add',
  title: "Adicionar",
  parent:"cargos.index",      
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'cargosAdd'});
  },
});

cargosRoutes.route('/:id/view', {
  name: 'cargos.view',
  title: function(){return Cargos.findOne({_id:FlowRouter.getParam('id')}).nome;},
  parent:"cargos.index",      
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'cargosView'});
  },
  
});


cargosRoutes.route('/:id/edit', {
  name: 'cargos.edit',
  title: "Editar",
  parent:"cargos.view",      
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'cargosEdit'});
  },
});