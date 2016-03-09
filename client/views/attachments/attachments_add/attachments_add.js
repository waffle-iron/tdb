onAddAttachmentSuccess = function(doc) {
  let currentRoute = FlowRouter.getRouteName();

  toastr.success('Attachment created successfully: ' + doc.name, 'Success');

  if (currentRoute === 'organizations.add') {
  	Modal.hide();
  }

  if (currentRoute === 'attachments.add') {
    FlowRouter.go('attachments.dashboard');
  }
}
