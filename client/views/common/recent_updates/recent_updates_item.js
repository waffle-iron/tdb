const INSERT_COLOR = 'info';
const UPDATE_COLOR = 'success';
const REMOVE_COLOR = 'danger';
const DEFAULT_COLOR = 'default';
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
        return TECHNOLOGIES_ICON;
      case 'organizations':
        return ORGANIZATIONS_ICON;
      case 'projects':
        return PROJECTS_ICON;
      case 'attachments':
        return ATTACHMENTS_ICON;
      default:
        return 'fa fa-question';
    }
  }
});
