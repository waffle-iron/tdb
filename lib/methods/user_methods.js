if (Meteor.isServer) {
  Meteor.methods({
    inviteUser(doc) {
      if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), ['admin', 'god'])) {
        throw new Meteor.Error(403, 'Access denied');
      }
			this.unblock();
      check(doc, Schema.InviteUser);
      chance = new Chance();
      let password = chance.bb_pin();
      doc.info = doc.info || {};
      let options = {
        email: doc.email,
        password: password,
        info: doc.info
      };

      try {
        let userId = Accounts.createUser(options);
        Accounts.sendResetPasswordEmail(userId);
        Roles.addUsersToRoles(userId, doc.roles, Roles.GLOBAL_GROUP);
        return true;
      } catch (e) {
        throw new Meteor.Error(e.error, e.reason);
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
