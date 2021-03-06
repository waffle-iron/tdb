import { Technologies } from '../../imports/api/technologies/technologies';

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
      _id: true,
      name: true,
      attachmentsId: true
    }
  };

  return {
    find: function() {
      this.unblock();
      return Attachments.find({
        _id: attachmentId
      });
    },
    children: [{
      find: function(attachment) {
        return Meteor.users.find({
          _id: attachment.createdBy
        });
      }
    }, {
      find: function(attachment) {
        return Projects.find(childQuery, childOptions);
      }
    }, {
      find: function(attachment) {
        return Technologies.find(childQuery, childOptions);
      },
    }, {
      find: function(attachment) {
        return Organizations.find(childQuery, childOptions);
      }
    }]
  };
});

Meteor.publish('attachments.quickList', function() {
  return Attachments.find({}, {
    fields: {
      name: 1
    }
  });
});

Meteor.publish('last-attachment-added', function() {
  return Attachments.find({}, {
    sort: {
      createdAt: -1
    },
    limit: 1
  });
});

Meteor.publish('attachments-counter', function() {
  Counts.publish(this, 'attachments-total', Attachments.find());
});


Meteor.publish('attachment-relations-counter', function(attachmentId) {
  check(attachmentId, String);

  Counts.publish(this, 'attachment-technologies-' + attachmentId, Technologies.find({
    attachmentsId: attachmentId
  }));
  Counts.publish(this, 'attachment-organizations-' + attachmentId, Organizations.find({
    attachmentsId: attachmentId
  }));
  Counts.publish(this, 'attachment-projects-' + attachmentId, Projects.find({
    attachmentsId: attachmentId
  }));
});
