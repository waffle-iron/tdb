Template.manageUserRoleItem.helpers({
  adminColor() {
    return this.role === 'admin' ? ColorMap.roles.admin : 'default';
  },
  viewerColor() {
    return this.role === 'viewer' ? ColorMap.roles.viewer : 'default';
  },
  editorColor() {
    return this.role === 'editor' ? ColorMap.roles.editor : 'default';
  }
});

