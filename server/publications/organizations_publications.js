Meteor.publishComposite('tabularOrganizationsList', function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));
  this.unblock();
  return {
    find() {
      this.unblock();
      return Organizations.find({
        _id: {
          $in: ids
        }
      }, {
        fields: fields
      });
    },
  };
});

Meteor.publishComposite('organizations.single', function(organizationId) {
  check(organizationId, String);
  this.unblock();
  return {
    find() {
      this.unblock();
      return Organizations.find({_id: organizationId});
    },
    children: [
      {
        find(org) {
          return Projects.find({
            _id: {$in: org.projectsId}
          });
        }
      },
      {
        find(org) {
          return Technologies.find({
            _id: {$in: org.technologiesId}
          });
        }
      }
    ]
  };
});
