// Use "orion generate model" to create new models
// ...
// Also creates files in server/publications

TabularTables = {};

Schema = {};

CollectionBehaviours.configure('timestampable',{
  createdAt: 'criadoEm',
  createdBy: 'criadoPorId',
  updatedAt: 'atualizadoEm',
  updatedBy: 'atualizadoPorId',
  systemId: '0'
});

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);


getLink = function(cell,cellData,rowData){
  var nome = (typeof cellData.nome === 'function') ? cellData.nome() : cellData.nome;

  return Blaze.renderWithData(Template.nameLink, {
    link: cellData.link(),
    nome: nome
  }, cell);
}