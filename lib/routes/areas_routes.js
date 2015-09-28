var areasRoutes = FlowRouter.group({
  prefix: '/areas',
  name:"Áreas"
});

areasRoutes.route('/', {
  name: 'areas.index',
  title: "Áreas",
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'areas'});
  },
  
});


areasRoutes.route('/add', {
  name: 'areas.add',
  title: "Adicionar",
  parent:"areas.index",      
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'areasAdd'});
  },
});

areasRoutes.route('/:id/view', {
  name: 'areas.view',
  title: function(){return Areas.findOne({_id:FlowRouter.getParam('id')}).nome;},
  parent:"areas.index",      
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'areasView'});
  },
  
});


areasRoutes.route('/:id/edit', {
  name: 'areas.edit',
  title: "Editar",
  parent:"areas.view",      
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'areasEdit'});
  },
  
});