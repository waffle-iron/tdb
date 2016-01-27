Template.registerHelper('ORGANIZATIONS_ICON', function() {
  return ORGANIZATIONS_ICON;
});
Template.registerHelper('PROJECTS_ICON', function() {
  return PROJECTS_ICON;
});
Template.registerHelper('TECHNOLOGIES_ICON', function() {
  return TECHNOLOGIES_ICON;
});
Template.registerHelper('ATTACHMENTS_ICON', function() {
  return ATTACHMENTS_ICON;
});

formatRole = function(role, cor = false) {
  let spanClass = texto = '';
  switch (role) {
  case 'god':
    spanClass = 'badge-success';
    texto = 'God';
    break;
  case 'admin':
    spanClass = 'badge-danger';
    texto = 'Administrator';
    break;
  case 'user':
    spanClass = 'badge-primary';
    texto = 'User';
    break;
  default:
    spanClass = 'badge-primary';
    texto = 'Unknown';
  }

  return cor ? '<span class="badge ' + spanClass + '">' + texto + '</span>' : texto;
};


Template.registerHelper('$log', function(what) {
  console.log(what);
});

Template.registerHelper('$concat', function(a = String(a), b = String(b)) {
  return a + b;
});

/*
Template.registerHelper('isInRoles', function(roles) {
  if (!roles) return true;
  roles.push('god');
  if (Roles.userIsInRole(Meteor.userId(), roles)) {
    return true;
  }

  let autho = false;

  autho = _.find(roles, function(role) {
    return Roles.userIsInRole(Meteor.userId(), role);
  });
  return autho;
});
*/

Template.registerHelper('formatarReais', function(valor) {
  return accounting.formatMoney(valor, 'R$ ', 2, '.', ',');
});


Template.registerHelper('formatRole', function(role, color) {
  if (color === 'false') color = false;
  return formatRole(role, color);
});
