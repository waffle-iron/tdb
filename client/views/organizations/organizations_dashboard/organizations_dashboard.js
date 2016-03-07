

Template.organizationsDashboard.helpers({
  organizations() {
    return SearchSources.globalSearch.getTransformedData();
  },
  getDescription() {
    return this._highlight && this._highlight.description ? this._highlight.description : this.description;
  },

  getOptions() {
    return {
      types: ['organizations']
    };
  },
  orgSelector() {
    return {
      collection: 'organizations'
    };
  },
  onDelete() {
    return function(data) {
      console.log('delete ', data);
    };
  },
  onEdit() {
    return function(data) {
      Modal.show('orgEdit', {
        orgId: data._id
      });
    };
  }
});
