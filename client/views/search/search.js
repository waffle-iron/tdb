const SEARCH_THROTTLE = 200;

let options = {
  keepHistory: 1000 * 6,
  localSearch: true
};
let fields = ['name', 'description'];
globalSearch = new SearchSource('globalSearch', fields, options);


Template.search.helpers({
  results() {
    let results =  globalSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<b>$&</b>');
      },
      sort: {_score: -1}
    });
    return results;
  },
  metadata() {
    return globalSearch.getMetadata();
  },
  searchStatus() {
    return globalSearch.getStatus();
  }
});

Template.search.events({
  'input #search': _.throttle((e, template) => {
    let text = $(e.target).val().trim();
    template.data.searchText.set(text);
  }, SEARCH_THROTTLE)
});

Template.search.onCreated(function() {
  this.data.searchText = new ReactiveVar();

  this.autorun(() => {
    let entityFilter = Session.get('entityFilter') || [];
    let searchText = this.data.searchText.get() || '';
    globalSearch.search(searchText, {
      types: entityFilter
    });
  });
});


Template.selectEntities.helpers({
  entities() {
    return [
      {
        name: 'organizations',
        icon: 'fa fa-star'
      },
      {
        name: 'projects',
        icon: 'fa fa-building'
      },
      {
        name: 'technologies',
        icon: 'fa fa-user'
      },
      {
        name: 'attachments',
        icon: 'fa fa-diamond'
      },
    ];
  },
  isSelected() {
    let selection = Template.instance().data.selection.get();
    return _.contains(selection, this.name);
  }
});

Template.selectEntities.events({
  'click .select-entity': function(e, template) {
    let selection = template.data.selection;
    let selectionArray = selection.get() || [];
    let exists = _.indexOf(selectionArray, this.name);

    if (exists === -1) {
      selectionArray.push(this.name);
    } else {
      selectionArray.splice(exists, 1);
    }

    selection.set(selectionArray);
  }
});


Template.selectEntities.onCreated(function() {
  this.data.selection = new ReactiveVar();

  this.autorun(() => {
    let selectionArray = this.data.selection.get();
    Session.set('entityFilter', selectionArray);
  });
});
