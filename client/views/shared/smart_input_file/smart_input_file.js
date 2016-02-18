Template.smartInputFile.events({
  'change .btn-file': function(e, t) {
    let file = e.target.files[0];

    t.file.set(file);
    t.onFileSelected(file);
  },

  'click .btn-upload': function(e, t) {
    let file = t.file.get();

    Files.insert(file, function(err, fileObj) {
      if (err) return t.onUploadError(err);

      // fileObj is just a reference, doesn't mean
      // that is uploaded.
      t.fileObj.set(fileObj);
      return t.onUploadBegin(fileObj);
    });
  }
});

Template.smartInputFile.helpers({
  btnFileText() {
    return Template.instance().btnFileText();
  },
  btnUploadText() {
    return Template.instance().btnUploadText.get();
  },
  fileNameText() {
    return Template.instance().fileNameText();
  },
  isFileSelected() {
    return Template.instance().isFileSelected();
  }
});

Template.smartInputFile.onCreated(function() {
  this.state = new ReactiveVar;
  this.file = new ReactiveVar; // File from the client
  this.fileObj = new ReactiveVar; // File from the server
  this.btnUploadText = new ReactiveVar('Upload file');

  this.autorun(() => {
    let fileObj = this.fileObj.get();
    if (fileObj) {
      this.subscribe('files.single', this.fileObj.get()._id);

      // The method hasStored check when the file
      // succefully uploaded.
      let uploadedFile = Files.findOne(fileObj._id);
      if (uploadedFile && uploadedFile.hasStored('files')) {
        this.onUploadSuccess(uploadedFile);
      }
    }
  });

  // =======================================
  // ============== Helpers ================
  // =======================================
  this.isFileSelected = () => {
    return this.file.get() !== undefined;
  };

  this.btnFileText = () => {
    return this.isFileSelected() ? 'Change file...' : 'Browse file...';
  };

  this.fileNameText = () => {
    return this.isFileSelected() ? this.file.get().name : '';
  };

  // =======================================
  // ============ Callbacks ================
  // =======================================
  this.onFileSelected = (file) => {
    this.data.onFileSelected && this.data.onFileSelected(file);
  };

  this.onUploadBegin = (fileObj) => {
    this.btnUploadText.set('Uploading file...');
    this.data.onUploadBegin && this.data.onUploadBegin(fileObj);
  };

  this.onUploadError = (err) => {
    console.error('onUploadError:', err);
    this.btnUploadText.set('Upload file');
    this.data.onUploadError && this.data.onUploadError(err);
  };

  this.onUploadSuccess = (fileObj) => {
    this.btnUploadText.set('Upload file');
    this.data.onUploadSuccess && this.data.onUploadSuccess(fileObj);
  };
});
