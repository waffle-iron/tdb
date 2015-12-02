Template.menu.helpers({
  items: function() {
    return [
      {
        regex: '^users',
        name: 'Usuários',
        icon: 'fa fa-users',
        roles: ['god', 'admin', 'gestor'],
        submenu: [
          {
            name: 'Gerenciar',
            linkTo: 'users.index',
            roles: ['god', 'admin', 'gestor']
          },
          {
            roles: ['god', 'admin', 'gestor'],
            linkTo: 'users.add',
            name: 'Adicionar'
          }
        ]
      },
      {
        regex: '^areas',
        name: 'Áreas',
        icon: 'fa fa-database',
        roles: ['god', 'admin', 'gestor'],
        submenu: [
          {
            roles: ['god', 'admin', 'gestor'],
            linkTo: 'areas.index',
            name: 'Gerenciar'
          },
          {
            roles: ['god', 'admin', 'gestor'],
            linkTo: 'areas.add',
            name: 'Adicionar'
          }
        ]
      },
      {
        regex: '^cargos',
        name: 'Cargos',
        icon: 'fa fa-briefcase',
        roles: ['god', 'admin', 'gestor'],
        submenu: [
          {
            roles: ['god', 'admin', 'gestor'],
            linkTo: 'cargos.index',
            name: 'Gerenciar'
          },
          {
            roles: ['god', 'admin', 'gestor'],
            linkTo: 'cargos.add',
            name: 'Adicionar'
          }
        ]
      },
      {
        regex: '^carreiras',
        name: 'Carreiras',
        icon: 'fa fa-map-o',
        roles: ['god', 'admin', 'gestor'],
        submenu: [
          {
            roles: ['god', 'admin', 'gestor'],
            linkTo: 'carreiras.index',
            name: 'Gerenciar',
          },
          {
            roles: ['god', 'admin', 'gestor'],
            linkTo: 'carreiras.add',
            name: 'Adicionar'
          }
        ]
      },
      {
        regex: '^senioridades',
        name: 'Senioridades',
        icon: 'fa fa-list-ol',
        roles: ['god', 'admin', 'gestor'],
        submenu: [
          {
            roles: ['god', 'admin', 'gestor'],
            linkTo: 'senioridades.index',
            name: 'Gerenciar',
          },
          {
            roles: ['god', 'admin', 'gestor'],
            linkTo: 'senioridades.add',
            name: 'Adicionar'
          }
        ]
      },
      {
        regex: '^arvore',
        name: 'Árvore',
        icon: 'fa fa-tree',
        roles: ['god', 'admin'],
        linkTo: 'arvore.index'
      },
      {
        regex: '^diagrama',
        name: 'Diagrama',
        icon: 'fa fa-circle',
        roles: ['god', 'admin'],
        linkTo: 'diagrama.index'
      },
    ];
  }
});

