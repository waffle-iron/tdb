Template.technologiesDashboardStat.onCreated(function() {
  this.subscribe('technologies-status-counter');
});

Template.technologiesDashboardStat.helpers({
  publishedCount() {
    return Counts.get('technologies-published');
  },
  reviewCount() {
    return Counts.get('technologies-review');
  },
  draftCount() {
    return Counts.get('technologies-draft');
  },
});

