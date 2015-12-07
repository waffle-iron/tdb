removeConfirmation = function(name, callback) {
  swal({
    title: 'Are you sure?',
    text: 'Your will not be able to recover this document "' + name + '"!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: false
  }, () => {
    callback();
  });
};

removeSuccess = function() {
  swal('Deleted!', 'Your document has been deleted.', 'success');
};

removeError = function() {
  swal('Error!', 'Your document has not been deleted.', 'danger');
};

