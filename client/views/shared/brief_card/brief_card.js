Template.briefCard.helpers({
  color() {
    ColorMap.operations[this.operation] || ColorMap.operations.default;
  },
  icon() {
    return Icons.collections[this.collection] || Icons.collections.default;
  },
  getClass() {
    let state = Template.instance().state.get();
    if (state === 'updated') {
      return 'updated';
    }
    if (state === 'deleted') {
      return 'deleted';
    }
  },
  stateDeleted() {
    return Template.instance().state.get() === 'deleted';
  },
  stateEdited() {
    return Template.instance().state.get() === 'updated';
  }
});

Template.briefCard.onCreated(function() {
  this.state = new ReactiveVar();
});

Template.briefCard.events({
  'click .edit': function(e, t) {
    e.stopPropagation();
    e.preventDefault();
    if (t.data.onEdit && typeof t.data.onEdit === 'function') {
      t.data.onEdit(t.data, t);
    }
  },
  'click .delete': function(e, t) {
    e.stopPropagation();
    e.preventDefault();
    if (t.data.onDelete && typeof t.data.onDelete === 'function') {
      t.data.onDelete(t.data, t);
    }
  },
  'click .link': function(e, t) {
    e.preventDefault();
    FlowRouter.go(t.data.link);
  }
});

