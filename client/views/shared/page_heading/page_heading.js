Template.pageHeading.helpers({

  // Need refactor.
  // Its 2:48am now. Zzzzzzzz...

  title() {
    var title = FlowRouter.current().route.options.title;
    FlowRouter.watchPathChange();
    return (typeof title === 'function') ? title() : title;
  },


  btnText() {
    var btnText = FlowRouter.current().route.options.btnText;
    FlowRouter.watchPathChange();
    return (typeof btnText === 'function') ? btnText() : btnText;
  },

  btnLink() {
    var btnLink = FlowRouter.current().route.options.btnLink;
    FlowRouter.watchPathChange();
    return (typeof btnLink === 'function') ? btnLink() : btnLink;
  }

});
