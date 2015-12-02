//
//  Publication da lista de carreiras
//  children:
//    Senioridades
//
Meteor.publishComposite('tabular_CarreirasList', function(tableName, ids, fields) {
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

      return Carreiras.find({_id: {$in: ids}}, {fields: fields});
    },
    children: [
      {
        find(carreira) {
          return Senioridades.find({_id: {$in: carreira.estrutura || []}}, {fields: {nome: 1}});
        }
      }
    ]
  };
});

Meteor.publish('quickListCarreiras', function() {
  this.unblock();
  if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'god'])) {
    return this.ready();
  }
  return Carreiras.find({}, {fields: {nome: 1, tipo: 1}});
});
