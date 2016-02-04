SearchSource.prototype.getTransformedData = function() {
  return this.getData({
    transform(matchText, regExp) {
        return matchText.replace(regExp, '<b>$&</b>');
      },
      sort: {
        _score: -1
      }
  });
};

Template.organizationsDashboard.helpers({
  organizations() {
      return SearchSources.globalSearch.getTransformedData();
    },
    getLink() {
      return FlowRouter.route('organizationsEntry', {id: _id});
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
        //let org = Organizations.findOne(data._id);
        Modal.show('orgEdit', {
          orgId: data._id
        });

        console.log('edit', data);
      };
    }
});
