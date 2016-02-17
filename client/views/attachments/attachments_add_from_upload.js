Template.attachmentsAddFromUpload.events({
  'change .btn-file :file': function(e, t) {
  	$('.file-path').val(e.target.files[0].name);
  }
});

Template.attachmentsAddFromUpload.onCreated(function(){
  this.file = new ReactiveVar;
})
