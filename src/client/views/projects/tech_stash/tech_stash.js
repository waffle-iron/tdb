buildRegExp = function(searchText) {
  let words = searchText.trim().split(/[ \-\:\.]+/);
  let exps = _.map(words, function(word) {
    return `(?=.*${word})`;
  });
  let fullExp = exps.join('') + '.+';
  return new RegExp(fullExp, 'i');
};

Template.techStash.events({
  'click .add-to-stash': function(event, template) {
    Modal.show('techStashAdd', {
      projectId: template.data._id
    });
  },
  'input .stash-filter': function(e, t) {
    t.filter.set($(e.target).val());
  }
});

Template.techStash.helpers({
  filteredTechnologiesStash() {
    let filteredProject =  Projects.findOne({
      _id: this._id,
      technologiesStash: {
        $elemMatch: {
          techName: buildRegExp(Template.instance().filter.get())
        }
      }
    });

    return filteredProject && filteredProject.technologiesStash || [];
  }
});

Template.techStash.onCreated(function() {
  this.filter = new ReactiveVar('');
  this.autorun(() => {
    this.subscribe('techStash.single', );
  });
});
