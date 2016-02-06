Meteor.publishComposite('tabularAttachmentsList', function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));
  this.unblock();
  return {
    find() {
      this.unblock();
      return Attachments.find({
        _id: {
          $in: ids
        }
      }, {
        fields: fields
      });
    },
  };
});

Meteor.publishComposite('attachments.single', function(attachmentId) {
  check(attachmentId, String);
  return {
    find() {
      return Attachments.find({
        _id: attachmentId
      });
    }
  };
});
