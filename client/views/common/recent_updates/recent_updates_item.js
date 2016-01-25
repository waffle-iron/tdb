const INSERT_COLOR = 'green';
const UPDATE_COLOR = 'blue';
const REMOVE_COLOR = 'red';
const DEFAULT_COLOR = 'black';
Template.recentUpdatesItem.helpers({
  color() {
    switch (this.operation) {
      case 'insert':
        return 'info';
      case 'update':
        return 'success';
      case 'remove':
        return 'danger';
      default:
        return 'default';
    }
  },
  icon() {
    switch (this.collection) {
      case 'technologies':
        return 'fa fa-database';
      case 'organizations':
        return 'fa fa-building';
      case 'projects':
        return 'fa fa-briefcase';
      case 'attachments':
        return 'fa fa-paperclip';
      default:
        return 'fa fa-question';
    }
  }
});
