//
//  Publication da lista de areas com tabular
//  children:
//    Area (pai)
//
Meteor.publishComposite('tabularAreasList', function(tableName, ids, fields) {
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

      return Areas.find({_id: {$in: ids}}, {fields: fields});
    },
    children: [
      {
        find(area) {
          this.unblock();
          return Areas.find({_id: area.paiId}, { fields: { nome: 1}});
        },
      },
    ],
  };
});


Meteor.publish('quickListAreas', function() {
  this.unblock();
  if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'god'])) {
    return this.ready();
  }
  return Areas.find({}, {fields: {nome: 1, tipo: 1}});
});


Meteor.publishComposite('area', function(id) {
  check(id, String);
  this.unblock();
  return {
    find() {
      this.unblock();
      if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'god'])) {
        return false;
      }

      return Areas.find({_id: id});
    },
    children: [
      {
        find(area) {
          this.unblock();
          return Areas.find({_id: area.paiId}, { fields: { nome: 1}});
        },
      },
    ],
  };
});

Meteor.publish('areas', function() {
  this.unblock();
  if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'god'])) {
    return false;
  }
  return Areas.find({}, {sort: {tipo: 1}});
});
