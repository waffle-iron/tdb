Meteor.publishComposite('tabularTechnologiesList', function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));
  this.unblock();
  return {
    find() {
      this.unblock();
      return Technologies.find({
        _id: {
          $in: ids
        }
      }, {
        fields: fields
      });
    },
  };
});


Meteor.publishComposite('technologies.single', function(techId) {
  check(techId, String);
  this.unblock();

  return {
    find() {
      this.unblock();
      return Technologies.find({
        _id: techId
      });
    }
  };
});

Meteor.publish('technologies.quickList', function() {
  return Technologies.find({}, {
    fields: {
      name: 1
    }
  });
});
