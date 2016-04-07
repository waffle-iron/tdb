Template.attachmentsDashboardStat.onCreated(function() {
  this.subscribe('last-attachment-added');
});

Template.attachmentsDashboardStat.helpers({
  totalCount() {
    return Counts.get('docCounter-attachments');
  },
  lastAttachmentAdded() {
    return Attachments.findOne({}, {
      sort: {
        createdAt: -1
      }
    });
  }
});

