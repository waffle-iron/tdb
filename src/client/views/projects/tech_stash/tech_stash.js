/*buildRegExp = function(searchText) {
  let words = searchText.trim().split(/[ \-\:\.]+/);
  let exps = _.map(words, function(word) {
    return `(?=.*${word})`;
  });
  let fullExp = exps.join('') + '.+';
  return new RegExp(fullExp, 'i');
};


Template.techStash.events({
  'input .stash-filter': function(event, template) {
    template.filter.set($(event.target).val());
  }
});

Template.techStash.onCreated(function() {
  this.filter = new ReactiveVar();
});

Template.techStash.helpers({
  filter() {
    let regex = buildRegExp(Template.instance().filter.get() || '');
    return {
      name: regex
    };
  }
});
*/


Template.techStash.events({
  'click .add-to-stash': function(event, template) {
    Modal.show('techStashAdd', {
      projectId: template.data._id
    });
  }
});


Template.techStash.onCreated(function() {
  this.autorun(() => {
    this.subscribe('techStash.single', );
  })
});
