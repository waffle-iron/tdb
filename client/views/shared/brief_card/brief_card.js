Template.briefCard.helpers({
  color() {
    ColorMap.operations[this.operation] || ColorMap.operations.default;
  },
  icon() {
    return Icons.collections[this.collection] || Icons.collections.default;
  }
});

Template.briefCard.events({
  'click .edit': function(e, t) {
    e.stopPropagation();
    if (t.data.onEdit && typeof t.data.onEdit === 'function') {
      t.data.onEdit(t.data);
    }
  },
  'click .delete': function(e, t) {
    e.stopPropagation();
    if (t.data.onDelete && typeof t.data.onDelete === 'function') {
      t.data.onDelete(t.data);
    }
  },
  'click .brief-card': function(e, t) {
    FlowRouter.go(t.data.link);
  }
});

