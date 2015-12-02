Template.toggleRole.helpers({
  roles: function() {
    return Meteor.roles.find();
  },
  checked: function() {
    let userId = Template.instance().data._id;
    let user = Meteor.users.findOne({
      _id: userId
    });
    return this.name === user.role() ? 'active' : '';
  }
});

Template.toggleRole.events({
  'click .btn': function(e, tmpl) {
    e.preventDefault();
    let userId = tmpl.data._id;
    let role = this.name;
    alertify.confirm('Tem certeza?', function() {
      Meteor.call('updateRoles', userId, role, (err) => {
        if (err) {
          toastr.error(err.toString(), 'Erro');
        } else {
          toastr.success('Role changed: ' + role, 'Success');
        }
        Modal.hide();
      });
    });
  }
});

