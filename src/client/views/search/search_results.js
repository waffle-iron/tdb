Template.searchResults.onRendered(function() {
  const cardsBox = this.firstNode;
  const masonry = new Masonry(cardsBox, {
    // columnWidth: '.cards-size',
    gutter: 15,
    percentPosition: true,
    itemSelector: '.cards-item'
  });

  cardsBox._uihooks = {
    insertElement(node, next) {
      // Attach a new invisible card to grid
      // it will appears only when the image is loaded.
      $(node).css('display', 'none');
      $(node).insertBefore(next);

      // Append to mansory when the card is ready
      $(node).imagesLoaded(() => {
        masonry.appended(node);
        masonry.layout();
      });
    },
    removeElement(node) {
      $(node).remove();
      masonry.remove(node);
      masonry.layout();
    }
  };
});
