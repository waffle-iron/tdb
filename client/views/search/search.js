Template.search.onCreated(function() {
  this.changedBriefCards = [];
});

Template.search.helpers({
  results() {
    _.each(Template.instance().changedBriefCards, (t) => {
      if (t) {
        t.state.set(null);
      }
    });
    Template.instance().changedBriefCards = [];
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
  //
  //  Delete Handler
  //
  onDelete() {
    let type = this._type;
    let identification;
    let _id;
    let changedBriefCards = Template.instance().changedBriefCards;
    //  TODO
    switch (type) {
      //
      //  Organizations
      //
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
              changedBriefCards.push(t);
            });
          });
        };
        //
        //  Technologies
        //
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
              t.state.set('deleted');
              changedBriefCards.push(t);
            });
          });
        };
        //
        //  Projects
        //
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
              t.state.set('deleted');
              changedBriefCards.push(t);
            });
          });
        };
        //
        //  Attachments
        //
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
              t.state.set('deleted');
              changedBriefCards.push(t);
            });
          });
        };
      default:
        console.log('Unknown');
    }
  },
  //
  //  Edit handler
  //
  onEdit() {
    let type = this._type;
    let changedBriefCards = Template.instance().changedBriefCards;
    switch (type) {
      //
      //  Organizations
      //
      case 'organizations':
        identification = this.name;
        return function(data, t) {
          Modal.show('orgEdit', {
            orgId: data._id,
            onSuccess: function() {
              t.state.set('updated');
              changedBriefCards.push(t);
            }
          });
        };
        //
        //  Technologies
        //
      case 'technologies':
        identification = this.name;
        return function(data, t) {
          Modal.show('technologiesEdit', {
            techId: data._id,
            onSuccess() {
              t.state.set('updated');
              changedBriefCards.push(t);
            }
          });
        };
        //
        //  Projects
        //
      case 'projects':
        identification = this.name;
        return function(data, t) {
          Modal.show('projectsEdit', {
            projectId: data._id,
            onSuccess() {
              t.state.set('updated');
              changedBriefCards.push(t);
            }
          });
        };
        //
        //  Attachments
        //
      case 'attachments':
        identification = this.name;
        return function(data, t) {
          Modal.show('attachmentsEdit', {
            attachmentId: data._id,
            onSuccess() {
              t.state.set('updated');
              changedBriefCards.push(t);
            }
          });
        };
      default:
        console.log('Unknown');
    }
  }
});
