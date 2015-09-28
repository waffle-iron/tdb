var carreirasRoutes = FlowRouter.group({
  prefix: '/carreiras',
  name:"Carreiras"
});

carreirasRoutes.route('/', {
  name: 'carreiras.index',
  title: "Carreiras",
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'carreiras'});
  },
  
});


carreirasRoutes.route('/add', {
  name: 'carreiras.add',
  title: "Adicionar",
  parent:"carreiras.index",      
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'carreirasAdd'});
  },
});

carreirasRoutes.route('/:id/view', {
  name: 'carreiras.view',
  title: function(){return Carreiras.findOne({_id:FlowRouter.getParam('id')}).nome;},
  parent:"carreiras.index",      
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'carreirasView'});
  },
  
});


carreirasRoutes.route('/:id/edit', {
  name: 'carreiras.edit',
  title: "Editar",
  parent:"carreiras.view",      
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'carreirasEdit'});
  },
});

