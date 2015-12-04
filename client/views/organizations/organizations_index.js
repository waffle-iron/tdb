Template.organizations.onCreated(function() {
  TabularTables.Organizations = new Tabular.Table({
    name: 'OrganizationsList',
    collection: Organizations,
    sub: new SubsManager(),
    pub: 'tabularOrganizationsList',
    autoWidth: false,
    responsive: true,
    stateSave: true,
    extraFields: ['_id'],
    columns: [{
      title: 'Name',
      data: 'name',
      width: '90%'
  }, {
      title: 'Actions',
      tmpl: Template.organizationsActions,
      width: '10%'
  }],
    bPaginate: true
  });
});
