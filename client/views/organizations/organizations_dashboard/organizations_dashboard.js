SearchSource.prototype.getTransformedData = function() {
  return this.getData({
    transform(matchText, regExp) {
      return matchText.replace(regExp, '<em>$&</em>');
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
    return FlowRouter.route('organizationsEntry', {
      id: _id
    });
  },
  getDescription() {
    return this._highlight && this._highlight.description ? this._highlight.description : this.description;
  },
  getImg() {
    if (this.cloudinaryId) {
      return $.cloudinary.url(this.cloudinaryId, {
        width: 600,
        height: 400,
        crop: 'fill',
        gravity: 'center'
      });
    }
    return 'http://placehold.it/600x400';
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
