Template.searchResults.onRendered(function() {
  const cardsBox = this.firstNode;
  const options = {
    gutter: 15,
    percentPosition: true,
    columnWidth: '.cards-size',
    itemSelector: '.cards-item'
  };

  function triggerLayout() {
    return $(cardsBox).masonry(options);
  }

  // Init
  $masonry = triggerLayout();

  // Hooks
  cardsBox._uihooks = {
    insertElement(node, next) {
      // Attach a new invisible card to grid
      // it will appears only when the image is loaded.
      $(node).css('display', 'none');
      $(node).insertBefore(next);

      // Append to mansory when the card is ready
      $(node).imagesLoaded(() => {
        $masonry.masonry('appended', node);
        triggerLayout();
      });
    },
    removeElement(node) {
      $(node).velocity({
        opacity: [0, 1]
      }, {
        easing: 'easeOutQuad',
        duration: 200,
        queue: false,
        complete: function() {
          $(node).remove();
          $masonry.masonry('remove', node);
          triggerLayout();
        }
      });
    }
  };
});
