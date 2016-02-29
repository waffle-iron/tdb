const ADMIN = ['admin'];
const ADMIN_EDITOR = ['admin', 'editor'];
const ADMIN_EDITOR_VIEWER = ['admin', 'editor', 'viewer'];

Template.menu.helpers({
  items: function() {
    return [
      {
        regex: '^dashboard',
        name: 'Dashboard',
        linkTo: 'mainDashboard',
        icon: 'fa fa-dashboard',
        roles: ADMIN_EDITOR_VIEWER,
      },
      {
        regex: '^search',
        name: 'Search',
        linkTo: 'search',
        icon: 'fa fa-search',
        roles: ADMIN_EDITOR_VIEWER,
      },
      {
        regex: '^users',
        name: 'Users',
        icon: 'fa fa-users',
        roles: ADMIN_EDITOR_VIEWER,
        submenu: [
          {
            name: 'Dashboard',
            linkTo: 'users.dashboard',
            roles: ADMIN_EDITOR_VIEWER
          },
          {
            roles: ADMIN,
            linkTo: 'users.invite',
            name: 'Invite'
          }
        ]
      },
      {
        regex: '^technologies',
        name: 'Technologies',
        icon: Icons.collections.technologies,
        roles: ADMIN_EDITOR_VIEWER,
        submenu: [
          {
            roles: ADMIN_EDITOR_VIEWER,
            linkTo: 'technologies.dashboard',
            name: 'Dashboard'
          },
          {
            roles: ADMIN_EDITOR,
            linkTo: 'technologies.add',
            name: 'New'
          }
        ]
      },
      {
        regex: '^projects',
        name: 'Projects',
        icon: Icons.collections.projects,
        roles: ADMIN_EDITOR_VIEWER,
        submenu: [
          {
            roles: ADMIN_EDITOR_VIEWER,
            linkTo: 'projects.dashboard',
            name: 'Dashboard'
          },
          {
            roles: ADMIN,
            linkTo: 'projects.add',
            name: 'New'
          }
        ]
      },

      {
        regex: '^organizations',
        name: 'Organizations',
        icon: Icons.collections.organizations,
        roles: ADMIN_EDITOR_VIEWER,
        submenu: [
          {
            roles: ADMIN_EDITOR_VIEWER,
            linkTo: 'organizations.dashboard',
            name: 'Dashboard',
          },
          {
            roles: ADMIN_EDITOR,
            linkTo: 'organizations.add',
            name: 'New'
          }
        ]
      },
      {
        regex: '^attachments',
        name: 'Attachments',
        icon: Icons.collections.attachments,
        roles: ADMIN_EDITOR_VIEWER,
        submenu: [
          {
            roles: ADMIN_EDITOR_VIEWER,
            linkTo: 'attachments.dashboard',
            name: 'Dashboard',
          },
          {
            roles: ADMIN_EDITOR,
            linkTo: 'attachments.add',
            name: 'New'
          }
        ]
      }
    ];
  }
});
