Template.recentUpdatesItem.helpers({
  getText() {
    switch (Template.instance().data.operation) {
      case 'update': return 'was updated by';
      case 'insert': return 'was inserted by';
      case 'delete': return 'was deleted by';
      default: return 'unknown operation by';
    }
  },
  color() {
    return ColorMap.operations[this.operation] || ColorMap.operations.default;
  },
  icon() {
    return Icons.collections[this.collection] || Icons.collections.default;
  },
  userIdentification() {
    return this.user() && this.user().identification(['username', 'fullName', 'email']) || 'unknown';
  },
  routeName() {
    return `${this.collection}.entry`;
  }
});
