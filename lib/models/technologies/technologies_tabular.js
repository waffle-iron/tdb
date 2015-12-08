TabularTables.Technologies = new Tabular.Table({
  name: 'TechnologiesList',
  collection: Technologies,
  sub: new SubsManager(),
  pub: 'tabularTechnologiesList',
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
    tmpl: Meteor.isClient && Template.technologiesActions,
    width: '10%'
  }],
  bPaginate: true
});
