const INSERT_COLOR = 'info';
const UPDATE_COLOR = 'success';
const REMOVE_COLOR = 'danger';
const DEFAULT_COLOR = 'default';
Template.recentUpdatesItem.helpers({
  color() {
    ColorMap.actions[this.operation] || ColorMap.actions.default;
  },
  icon() {
    return Icons.collections[this.collection] || Icons.collections.default;
  }
});
