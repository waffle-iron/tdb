Template.organizationsAdd.helpers({
  steps: function() {
    return [
      {
        id: 'information',
        title: 'Organization Information',
        schema: Schemas.Organization
      },
      {
        id: 'keyPeople',
        title: 'Organization Key People',
        schema: Schemas.KeyPeople,
        onSubmit: function(data, wizard){
          console.log (data);
          console.log (wizard);
        }
      }
    ];
  }
});
