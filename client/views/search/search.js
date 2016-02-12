Template.search.helpers({
  results() {
    return SearchSources.globalSearch.getTransformedData();
  },
  getOptions() {
    return function() {
      let entityFilter = Session.get('entityFilter') || [];
      return {
        types: entityFilter
      };
    };
  },
  getLink() {
    switch (this._type) {
      case 'organizations':
        return FlowRouter.path('organizations.entry', {
          id: this._id
        });
      case 'technologies':
        return FlowRouter.path('technologies.entry', {
          id: this._id
        });
      case 'projects':
        return FlowRouter.path('projects.entry', {
          id: this._id
        });
      case 'attachments':
        return FlowRouter.path('attachments.entry', {
          id: this._id
        });
      default:
        return FlowRouter.path('search');
    }
  },
  onDelete() {
    let type = this._type;
    let identification;
    let _id;
    //  TODO
    switch (type) {
      case 'organizations':
        identification = this.name;
        _id = this._id;
        return function(data, t) {
          removeConfirmation(identification, () => {
            Meteor.call('Organizations.methods.remove', _id, (err, res) => {
              if (err) {
                return removeError();
              }
              removeSuccess();
              t.state.set('deleted');
            });
          });
        };
      case 'technologies':
        identification = this.name;
        _id = this._id;
        return function(data, t) {
          removeConfirmation(identification, () => {
            Meteor.call('Technologies.methods.remove', _id, (err, res) => {
              if (err) {
                return removeError();
              }
              removeSuccess();
            });
          });
        };
      case 'projects':
        identification = this.name;
        _id = this._id;
        return function(data, t) {
          removeConfirmation(identification, () => {
            Meteor.call('Projects.methods.remove', _id, (err, res) => {
              if (err) {
                return removeError();
              }
              removeSuccess();
              t.state.set('deleted');
            });
          });
        };
      case 'attachments':
        identification = this.name;
        _id = this._id;
        return function(data, t) {
          removeConfirmation(identification, () => {
            Meteor.call('Attachments.methods.remove', _id, (err, res) => {
              if (err) {
                return removeError();
              }
              removeSuccess();
              t.state.set('deleted');
            });
          });
        };
      default:
        console.log('Unknown');
    }
  },
  onEdit() {
    //  TODO
    let type = this._type;
    switch (type) {
      case 'organizations':
        identification = this.name;
        return function(data, t) {
          Modal.show('orgEdit', {
            orgId: data._id,
            onSuccess: function() {
              t.state.set('updated');
            }
          });
        };
      case 'technologies':
        identification = this.name;
        return function(data, t) {
          Modal.show('technologiesEdit', {
            techId: data._id,
            onSuccess() {
              t.state.set('updated');
            }
          });
        };
      case 'projects':
        identification = this.name;
        return function(data, t) {
          Modal.show('projectsEdit', {
            projectId: data._id,
            onSuccess() {
              t.state.set('updated');
            }
          });
        };
      case 'attachments':
        identification = this.name;
        return function(data, t) {
          Modal.show('attachmentsEdit', {
            attachmentId: data._id,
            onSuccess() {
              t.state.set('updated');
            }
          });
        };
      default:
        console.log('Unknown');
    }
  }
});
