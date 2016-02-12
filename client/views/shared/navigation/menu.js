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
            linkTo: 'users.dashboard',
            roles: ['god', 'admin']
          },
          {
            roles: ['god', 'admin'],
            linkTo: 'users.invite',
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
            linkTo: 'technologies.dashboard',
            name: 'Dashboard'
          },
          {
            roles: ['god', 'admin'],
            linkTo: 'technologies.add',
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
            linkTo: 'projects.dashboard',
            name: 'Dashboard'
          },
          {
            roles: ['god', 'admin'],
            linkTo: 'projects.add',
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
            linkTo: 'organizations.dashboard',
            name: 'Dashboard',
          },
          {
            roles: ['god', 'admin'],
            linkTo: 'organizations.add',
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
            linkTo: 'attachments.dashboard',
            name: 'Dashboard',
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
