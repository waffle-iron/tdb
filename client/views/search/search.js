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
    return function(data) {
      //  TODO
    };
  },
  onEdit() {
    //  TODO
    let type = this._type;
    return function(data) {
      switch (type) {
        case 'organizations':
          Modal.show('orgEdit', {
            orgId: data._id
          });
          break;
        case 'technologies':

          break;
        case 'projects':

          break;
        case 'attachments':

          break;
        default: 
          console.log('Unknown');
      }

    };
  }
});
