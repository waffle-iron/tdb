Template.menu.helpers({
  items: function() {
    return [
      {
        regex: '^dashboard',
        name: 'Dashboard',
        linkTo: 'mainDashboard',
        icon: 'fa fa-dashboard',
        roles: ['god', 'admin'],
      },
      {
        regex: '^log',
        name: 'Log',
        linkTo: 'log',
        icon: 'fa fa-database',
        roles: ['god', 'admin'],
      },
      {
        regex: '^search',
        name: 'Search',
        linkTo: 'search',
        icon: 'fa fa-search',
        roles: ['god', 'admin'],
      },
      {
        regex: '^users',
        name: 'Users',
        icon: 'fa fa-users',
        roles: ['god', 'admin'],
        submenu: [
          {
            name: 'Dashboard',
            linkTo: 'usersDashboard',
            roles: ['god', 'admin']
          },
          {
            roles: ['god', 'admin'],
            linkTo: 'usersInvite',
            name: 'Invite'
          }
        ]
      },
      {
        regex: '^technologies',
        name: 'Technologies',
        icon: Icons.collections.technologies,
        roles: ['god', 'admin'],
        submenu: [
          {
            roles: ['god', 'admin'],
            linkTo: 'technologiesDashboard',
            name: 'Dashboard'
          },
          {
            roles: ['god', 'admin'],
            linkTo: 'technologiesAdd',
            name: 'New'
          }
        ]
      },
      {
        regex: '^projects',
        name: 'Projects',
        icon: Icons.collections.projects,
        roles: ['god', 'admin'],
        submenu: [
          {
            roles: ['god', 'admin'],
            linkTo: 'projectsDashboard',
            name: 'Dashboard'
          },
          {
            roles: ['god', 'admin'],
            linkTo: 'projectsAdd',
            name: 'New'
          }
        ]
      },

      {
        regex: '^organizations',
        name: 'Organizations',
        icon: Icons.collections.organizations,
        roles: ['god', 'admin'],
        submenu: [
          {
            roles: ['god', 'admin'],
            linkTo: 'organizationsDashboard',
            name: 'Dashboard',
          },
          {
            roles: ['god', 'admin'],
            linkTo: 'organizationsAdd',
            name: 'New'
          }
        ]
      },
      {
        regex: '^attachments',
        name: 'Attachments',
        icon: Icons.collections.attachments,
        roles: ['god', 'admin'],
        submenu: [
          {
            roles: ['god', 'admin'],
            linkTo: 'attachments.index',
            name: 'Manage',
          },
          {
            roles: ['god', 'admin'],
            linkTo: 'attachments.add',
            name: 'New'
          }
        ]
      }
    ];
  }
});
