 Template.recentUpdatesItem.helpers({
  color() {
    return ColorMap.operations[this.operation] || ColorMap.operations.default;
  },
  icon() {
    return Icons.collections[this.collection] || Icons.collections.default;
  },
  userIdentification() {
    if (this.user()) {
      return this.user().identification(['username', 'fullName', 'email']);
    }
    return 'Unknown';
  }
});
