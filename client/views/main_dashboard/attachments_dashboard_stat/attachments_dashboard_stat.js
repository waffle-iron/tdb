Template.attachmentsDashboardStat.onCreated(function() {
  this.subscribe('last-attachment-added');
});

Template.attachmentsDashboardStat.helpers({
  lastAttachmentAdded() {
    return Attachments.findOne({}, {
      sort: {
        createdAt: -1
      }
    });
  }
});

