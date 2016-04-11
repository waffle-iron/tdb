
Template.perfectScrollbar.onRendered(function() {
  Ps.initialize(this.find('.ps-container'), {
    useBothWheelAxes: true
  });
  /*
  $('.ps-container').bind('DOMSubtreeModified', () => {
    Ps.update(this.find('.ps-container'));
  });
*/
});

