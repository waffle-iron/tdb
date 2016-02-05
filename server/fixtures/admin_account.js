Meteor.startup(function() {
  if (!Meteor.users.findOne({
      'emails.address': 'admin@admin.com'
    })) {
    let userId = Accounts.createUser({
      email: 'admin@admin.com',
      password: 'q1w2e3'
    });
    Roles.addUsersToRoles(userId, 'admin', Roles.GLOBAL_GROUP);
  }
});
