var senioridadesRoutes = FlowRouter.group({
  prefix: '/senioridades',
  name:"Senioridades"
});

senioridadesRoutes.route('/', {
  name: 'senioridades.index',
  title: "Senioridades",
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'senioridades'});
  },
  
});


senioridadesRoutes.route('/add', {
  name: 'senioridades.add',
  title: "Adicionar",
  parent:"senioridades.index",      
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'senioridadesAdd'});
  },
});

senioridadesRoutes.route('/:id/view', {
  name: 'senioridades.view',
  title: function(){return Senioridades.findOne({_id:FlowRouter.getParam('id')}).nome;},
  parent:"senioridades.index",      
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'senioridadesView'});
  },
  
});


senioridadesRoutes.route('/:id/edit', {
  name: 'senioridades.edit',
  title: "Editar",
  parent:"senioridades.view",      
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'senioridadesEdit'});
  },
});

