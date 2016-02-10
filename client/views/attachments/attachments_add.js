const STATE_IDLE = 0;
const STATE_SUCCESS = 1;
const STATE_ERROR = 2;
const STATE_LOADING = 3;

Template.attachmentsAdd.events({
    'input #attachment-url': _.throttle(function(e, t) {
      console.log('change');
        let url = e.target.value;

        t.state.set(STATE_LOADING);
        Meteor.call('getMetadataFromUrl', url, function(err, res) {
            if (err) {
                switch (err.error) {
                  case 'ENOTFOUND':
                    toastr.error('URL not found.');
                  break;
                  case 'ECONNREFUSED':
                    toastr.error('Connection refused.');
                  break;
                  default:
                    toastr.error('Error getting metadata.');
                }
                t.state.set(STATE_ERROR);
            } else {
                t.state.set(STATE_SUCCESS);
                t.meta.set({
                    title: res.title,
                    description: res.description,
                    imageUrl: res.image,
                });
            }
        });
    }, 250)
});

Template.attachmentsAdd.helpers({
    getStateIcon() {
        switch (Template.instance().state.get()) {
            case STATE_IDLE:
                return 'fa fa-search';
            case STATE_SUCCESS:
                return 'fa fa-check';
            case STATE_ERROR:
                return 'fa fa-bug';
            case STATE_LOADING:
                return 'fa fa-spinner fa-spin';
            default:
              return 'fa fa-question';
        }
    },
    imageUrl: function() {
        return Template.instance().image.get();
    },
    meta() {
        return Template.instance().meta.get();
    }
});

Template.attachmentsAdd.onCreated(function() {
    this.meta = new ReactiveVar({});
    this.state = new ReactiveVar(STATE_IDLE);
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
