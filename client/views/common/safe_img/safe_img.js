Template.safeImg.onRendered(function() {
  let width = this.data.width || 100;
  let height = this.data.height || 100;
  let fallbackSrc = this.fallbackSrc || 'http://placehold.it/' + width + 'x' + height;


  this.$('img').error(function() {
    $(this).unbind('error').attr('src', fallbackSrc);
  });

  if (!this.data.src) {
    this.$('img').trigger('error');
  }
});
