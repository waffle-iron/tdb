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
  this.unblock();

  let childQuery = {
    attachmentsId: {
      $in: [attachmentId]
    }
  };

  let childOptions = {
    fields: {
      name: true  
    }
  };

  return {
    find() {
      this.unblock();
      return Attachments.find({
        _id: attachmentId
      });
    },
    children: [{
        find(attachment) {
          return Meteor.users.find({
            _id: attachment.createdBy
          });
        }
      }, {
        find(attachment) {
          return Projects.find(childQuery, childOptions)
        }
      }, {
        find(attachment) {
          return Technologies.find(childQuery, childOptions)
        },
      }, {
        find(attachment) {
          return Organizations.find(childQuery, childOptions);
        }
      }
    ]
  }
});
