//
//  Publication da lista de cargos
//  children:
//    Area
//    Carreira
//
Meteor.publishComposite('tabular_CargosList', function(tableName, ids, fields) {
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

      return Cargos.find({_id: {$in: ids}}, {fields: fields});
    },
    children: [
      {
        find(cargo) {
          this.unblock();
          return Areas.find({_id: cargo.areaId}, { fields: { nome: 1}});
        },
      },
      {
        find(cargo) {
          return Carreiras.find({_id: cargo.carreiraId}, {fields: {nome: 1}});
        },
      },
    ],
  };
});


Meteor.publish('quickListCargos', function() {
  this.unblock();
  if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'god'])) {
    return this.ready();
  }
  return Cargos.find({}, {fields: {nome: 1}});
});


Meteor.publishComposite('cargo', function(id) {
  check(id, String);
  this.unblock();
  return {
    find() {
      this.unblock();
      if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'god'])) {
        return false;
      }

      return Cargos.find({_id: id});
    },
    children: [
      {
        find(cargo) {
          this.unblock();
          return Areas.find({_id: cargo.areaId}, { fields: { nome: 1}});
        },
      },
      {
        find(cargo) {
          this.unblock();
          return Carreiras.find({_id: cargo.carreiraId}, { fields: { nome: 1, estrutura: 1}});
        },
        children: [
          {
            find(carreira) {
              this.unblock();
              return Senioridades.find({_id: {$in: carreira.estrutura || []}});
            }
          }
        ]
      },
      {
        find(cargo) {
          this.unblock();
          return Classificacoes.find({cargoId: cargo._id});
        },
        children: [
          {
            find(classificacao) {
              this.unblock();
              return Backups.find({docId: classificacao._id});
            }
          }
        ]
      }
    ],
  };
});


Meteor.publishComposite('cargosDaArea', function(areaId) {
  check(areaId, String);
  this.unblock();
  return {
    find() {
      this.unblock();
      if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'god'])) {
        return false;
      }

      return Cargos.find({areaId: areaId});
    },
    children: [
      {
        find(cargo) {
          this.unblock();
          return Carreiras.find({_id: cargo.carreiraId}, {fields: {avatar: 1, estrutura: 1}});
        },
        children: [
          {
            find(carreira) {
              this.unblock();
              return Senioridades.find({_id: {$in: carreira.estrutura}});
            }
          }
        ]
      },
      {
        find(cargo) {
          this.unblock();
          return Classificacoes.find({cargoId: cargo._id});
        }
      }
    ],
  };
});
