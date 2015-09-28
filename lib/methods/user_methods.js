if (Meteor.isServer){
	Meteor.methods({
		inviteUser: function(doc){
			check(doc,Schema.InviteUser);
			chance = new Chance();
			var password = chance.bb_pin() ;

			var options = {
				email: doc.email,
				password: password,
				info: doc.info
			}

			try{
				var userId  = Accounts.createUser(options);
				Accounts.sendResetPasswordEmail(userId);
				Roles.addUsersToRoles(userId, doc.roles,Roles.GLOBAL_GROUP);
				return true;
			} catch(e){
				console.log(e);
				throw new Meteor.Error(e.error, e.reason)
			}
		},
		dummy:function(){
			console.log(Meteor.users.findOne({_id:Meteor.userId()}));
		},
		/**
		* update a user's permissions
		*
		* @param {Object} targetUserId Id of user to update
		* @param {Array} roles User's new permissions
		* @param {String} group Company to update permissions for
		*/
		updateRoles: function (targetUserId, role) {
			check(targetUserId, String);
			check(role,String);
			var loggedInUser = Meteor.user();

			if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin','god'])) {
			  throw new Meteor.Error(403, "Access denied")
			}

			console.log(targetUserId);
			console.log(role);
			Roles.setUserRoles(targetUserId, role, Roles.GLOBAL_GROUP)
		}		

		/*
		deleteUser: function (targetUserId) {
			var loggedInUser = Meteor.user()

			if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
			  throw new Meteor.Error(403, "Access denied")
			}

			// remove permissions for target group
			Roles.setUserRoles(targetUserId, []);

			// do other actions required when a user is removed...
		}	
		*/
	})
}