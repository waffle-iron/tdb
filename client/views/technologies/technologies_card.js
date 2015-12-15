Template.technologiesCardTooltip.onRendered(function() {
  this.$('[data-toggle="tooltip"]').tooltip();
});

Template.technologiesCard.helpers({
  panelColor() {
    console.log(this.status);
    switch (this.status) {
      case 'published':
        return 'panel-primary';
      case 'draft':
        return 'panel-warning';
      case 'review':
        return 'panel-success';
      default:
        return 'panel-default';
    }
  }
});


