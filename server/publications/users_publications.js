//
//  Publication da lista de users
//
Meteor.publishComposite('tabular_UsersList', function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));
  this.unblock();
  return {
    find() {
      this.unblock();
      if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'god'])) {
        return false;
      }

      return Meteor.users.find({_id: {$in: ids}}, {fields: fields});
    },
  };
});


/*
Meteor.publish(null, function() {
  return Meteor.users.find({}, {fields: {info: 1, roles: 1, criadoEm: 1, criadoPorId: 1, emails: 1, status: 1}});
});
*/

