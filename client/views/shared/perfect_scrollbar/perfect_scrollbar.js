
Template.perfectScrollbar.onRendered(function() {
  Ps.initialize(this.find('.ps-container'));
  $('.ps-container').bind('DOMSubtreeModified', () => {
    Ps.update(this.find('.ps-container'));
  });
});

