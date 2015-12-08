Template.technologyCard.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      $('.tooltip-demo').tooltip({
          selector: "[data-toggle=tooltip]",
          container: "body"
      });
    }
}

