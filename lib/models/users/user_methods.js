Meteor.users.methods = {};

function isProfileOwner(documentId) {
  return Meteor.userId() === documentId;
}



if (Meteor.isServer) {
  Meteor.methods({
    inviteUser(doc) {
        if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), ['admin', 'god'])) {
          throw new Meteor.Error(403, 'Access denied');
        }
        this.unblock();
        check(doc, InviteSchema);

        chance = new Chance();
        let password = chance.bb_pin();
        let options = {
          email: doc.email,
          password: password,
        };

        try {
          let userId = Accounts.createUser(options);
          Accounts.sendResetPasswordEmail(userId);
          Roles.addUsersToRoles(userId, doc.roles, Roles.GLOBAL_GROUP);
          return true;
        } catch (e) {
          throw new Meteor.Error(e.toString());
        }
      },
      /**
       * update a user's permissions
       *
       * @param {Object} targetUserId Id of user to update
       * @param {Array} roles User's new permissions
       * @param {String} group Company to update permissions for
       */
      updateRoles: function(targetUserId, role) {
        check(targetUserId, String);
        check(role, String);
        let loggedInUser = Meteor.user();

        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin', 'god', 'gestor'])) {
          throw new Meteor.Error(403, 'Access denied');
        }
        Roles.setUserRoles(targetUserId, role, Roles.GLOBAL_GROUP);
      }
  });
}


Meteor.methods({
  'users.setUserImage': function(userId, imageId) {
    check(userId, String);
    check(imageId, String);
    Meteor.users.update({
      _id: userId
    }, {
      $set: {
        'profile.imageId': imageId
      }
    });
  },
  'users/edit': function(modifier, documentId) {
    check(modifier, Meteor.users.Schema);
    check(documentId, String);

    if (isAdmin() || isProfileOwner(documentId)) {
      return Meteor.users.update({
        _id: documentId
      }, modifier);
    }
    throw new Meteor.Error(403, 'Não tem permissão.');
  }
});


/*Meteor.users.methods.updateProfile = new ValidatedMethod({
  name: 'Users.methods.updateProfile',
  validate(args, _id) {
    check(args, Schemas.Users);
  },
  run(modifier, _id) {
    console.log(modifier);
    console.log(_id);
    check(modifier, Schemas.Users);
    check(_id, String);
    return Meteor.users.update({
      _id: _id
    }, modifier);
  }
});
*/
Meteor.methods({
  'Users.updateProfile': function(modifier, documentId) {
    check(modifier, Schemas.Users);
    check(documentId, String);
    return Meteor.users.update({
      _id: documentId
    }, modifier);
  }
});
