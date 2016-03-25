Template.technologyLabel.helpers({
  labelColor() {
    switch (this.status) {
      case 'draft': return 'danger';
      case 'review': return 'warning';
      case 'published': return 'primary';
      default: return 'default';
    }
  }
});
