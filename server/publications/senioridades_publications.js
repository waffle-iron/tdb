//
//  Publication da lista de senioridades
//
Meteor.publishComposite('tabular_SenioridadesList', function(tableName, ids, fields) {
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

      return Senioridades.find({_id: {$in: ids}}, {fields: fields});
    },
  };
});


Meteor.publish('quickListSenioridades', function() {
  this.unblock();
  if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'god'])) {
    return this.ready();
  }
  return Senioridades.find({}, {fields: {nome: 1, tipo: 1}});
});

Meteor.publish('senioridade', function(id) {
  check(id, String);
  this.unblock();
  if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'god'])) {
    return this.ready();
  }
  return Senioridades.find({_id: id});
});
