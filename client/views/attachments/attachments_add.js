Template.attachmentsAdd.events({
  'keyup #attachment-url': function(e, t) {
    let url = e.target.value;
    
    Meteor.call('getMetadataFromUrl', url, function(err, res) {
      if (err){
      	console.log('Error fetching metadata...')
      }else {
      	t.title.set(res.title);
      	t.description.set(res.description);
      	t.image.set(res.image);
      }
    });
  }
});

Template.attachmentsAdd.helpers({
  imageUrl: function(){
  	return Template.instance().image.get();
  }
})

Template.attachmentsAdd.onCreated(function(){
  this.title = new ReactiveVar();
  this.description = new ReactiveVar();
  this.image = new ReactiveVar();

  this.autorun(() => {
  	$('input[name="title"]').val(this.title.get());
  	$('input[name="description"]').val(this.description.get());
  	$('input[name="imageUrl"]').val(this.image.get());
  });

});




AutoForm.hooks({
  insertAttachmentForm: {
    onSuccess() {
        toastr.success('Attachment created successfully: ' + this.insertDoc.name, 'Success');
        FlowRouter.go('attachmentsDashboard');
      },
      onError(formType, error) {
        toastr.error(error.toString(), 'Error');
      },
  }
});
