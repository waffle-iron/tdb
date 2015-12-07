Template.usersView.helpers({
  user: function() {
    let user = Meteor.users.findOne({
      _id: FlowRouter.getParam('id')
    });

    return user;
  },
  beforeRemove: function() {
    return function(collection, id) {
      let doc = collection.findOne(id);
      let object = this;
      alertify.confirm('Remover <b>' + doc.emails[0].address + '</b>?', function() {
        object.remove();
      });
    };
  },
  onSuccess: function() {
    return function() {
      FlowRouter.go('users.index');
    };
  },
  editingProfile: function() {
    return Session.get('editingProfile');
  }
});

Template.usersView.events({
  'click #change-profile-image': function(){
    Modal.show('usersChangeImage');
  },
  'click #escolher-grupo': function() {
    Modal.show('_usersEscolherGrupo', {
      _id: FlowRouter.getParam('id')
    });
  },
  'click #btn-edit-profile': function() {
    Session.set('editingProfile', !Session.get('editingProfile'));
  }
});

Template.usersView.onCreated(function() {
  Session.setDefault('editingProfile', false);
});

Template.usersView.onRendered(function() {
  /*
  $('.line').peity('line', {
      fill: '#1ab394',
      stroke: '#169c81'
  });

  $('.bar').peity('bar', {
      fill: ['#1ab394', '#d7d7d7']
  });
  */
});
