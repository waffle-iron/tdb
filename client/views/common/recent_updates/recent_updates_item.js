const INSERT_COLOR = 'green';
const UPDATE_COLOR = 'blue';
const REMOVE_COLOR = 'red';
const DEFAULT_COLOR = 'black';
Template.recentUpdatesItem.helpers({
  color() {
    switch (this.operation) {
      case 'insert':
        return INSERT_COLOR;
      case 'update':
        return UPDATE_COLOR;
      case 'remove':
        return REMOVE_COLOR;
      default:
        return DEFAULT_COLOR;
    }
  },
  icon() {
    switch (this.collection) {
      case 'technologies':
        return 'fa fa-database';
      case 'organizations':
        return 'fa fa-diamond';
      case 'projects':
        return 'fa fa-briefase';
      case 'attachments':
        return 'fa fa-building';
      default:
        return 'fa fa-question';
    }
  }
});
