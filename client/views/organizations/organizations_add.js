AutoForm.hooks({
  insertOrganizationForm: {
    onSuccess() {
        toastr.success('Organization created successfully: ' + this.insertDoc.name, 'Success');
        FlowRouter.go('organizations.index');
      },
      onError(formType, error) {
        toastr.success(error.toString(), 'Error');
      },
  }
});


  // steps: function() {
  //   return [
  //     {
  //       id: 'information',
  //       title: 'Organization Information',
  //       schema: Schemas.Organization
  //     },
  //     {
  //       id: 'keyPeople',
  //       title: 'Organization Key People',
  //       schema: Schemas.KeyPeople,
  //       onSubmit: function(data, wizard){
  //         console.log (data);
  //         console.log (wizard);
  //       }
  //     }
  //   ];
  // }
