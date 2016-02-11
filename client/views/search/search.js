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
    //  TODO
    console.log(this);
    return '';

    return FlowRouter.route('organizationsEntry', {
      id: this._id
    });
  },
  getDescription() {
    return this._highlight && this._highlight.description ? this._highlight.description : this.description;
  },
  onDelete() {
    return function(data) {
      //  TODO
    };
  },
  onEdit() {
    //  TODO
    return function(data) {
      Modal.show('orgEdit', {
        orgId: data._id
      });
    };
  }  
});


