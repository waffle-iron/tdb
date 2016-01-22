let options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: false
};
let fields = ['name', 'description'];

globalSearch = new SearchSource('globalSearch', fields, options);

Template.technologies.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('technologies.view', {id: rowData._id});
    });
  },
  'input #search': function(e) {
    let $el = $(e.target);
    let text = $el.val();
    console.log(text);
    globalSearch.search(text);
  }
});


Template.technologies.helpers({
  getResults() {
    let results =  globalSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<b>$&</b>');
      }
    });

    console.log(results);

    return results;
  },
  metadata() {
    return globalSearch.getMetadata();
  },
  searchStatus() {
    return globalSearch.getStatus();
  }
});
