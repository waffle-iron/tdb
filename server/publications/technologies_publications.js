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


Meteor.publishComposite('technologieCard', function(id) {
  check(id, String);
  this.unblock();

  return {
    find() {
      this.unblock();
      return Technologies.find({
        _id: id
      }, {
        fields: {
          _id: 1,
          name: 1,
          synonyms: 1,
          status: 1,
          tags: 1,
          organization: 1,
          images: {$elemMatch: {showcased: true}},
          readiness: 1,
          impact: 1,
          attachments: 1,
          description: {$elemMatch: {status: 'Published'}}
        }
      });
    }
  };
});
