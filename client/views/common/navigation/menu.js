Template.menu.helpers({
  items: function() {
    return [
      {
        regex: '^users',
        name: 'Users',
        icon: 'fa fa-users',
        roles: ['god', 'admin'],
        submenu: [
          {
            name: 'Manage',
            linkTo: 'users.index',
            roles: ['god', 'admin']
          },
          {
            roles: ['god', 'admin'],
            linkTo: 'users.add',
            name: 'New'
          }
        ]
      },
      {
        regex: '^technologies',
        name: 'Technologies',
        icon: 'fa fa-database',
        roles: ['god', 'admin'],
        submenu: [
          {
            roles: ['god', 'admin'],
            linkTo: 'technologies.index',
            name: 'Manage'
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
        icon: 'fa fa-briefcase',
        roles: ['god', 'admin'],
        submenu: [
          {
            roles: ['god', 'admin'],
            linkTo: 'projects.index',
            name: 'Manage'
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
        icon: 'fa fa-map-o',
        roles: ['god', 'admin'],
        submenu: [
          {
            roles: ['god', 'admin'],
            linkTo: 'organizations.index',
            name: 'Manage',
          },
          {
            roles: ['god', 'admin'],
            linkTo: 'organizations.add',
            name: 'New'
          }
        ]
      }
    ];
  }
});

