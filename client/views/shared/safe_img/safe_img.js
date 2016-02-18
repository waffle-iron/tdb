/*
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
*/


Template.safeImg.events({
  'load .safe-img': function(e, template) {
    console.log('loaded!');
    template.loadingImg.set(false);
  },
  'error .safe-img': function(e, tmp) {
    console.log('err');
  }
});

Template.safeImg.helpers({
  loadingImg: function() {
    return Template.instance().loadingImg.get();
  },
  notFound: function() {
    return '/img/not-found.png';
  }
});

Template.safeImg.onCreated(function() {
  console.log('created!');
  this.loadingImg = new ReactiveVar(true);
  this.data.sHeight = this.data.sHeight || this.data.height;
  this.data.sWidth = this.data.sWidth || this.data.width;

  this.lastUrl = this.data.url;

  this.autorun(() => {
    let data = Template.currentData();
    if (data.url !== this.lastUrl) {
      console.log('set loading = true');
      console.log(data);
      this.loadingImg.set(true);
      this.lastUrl = data.url;
    }

  });
});

Template.safeImg.onRendered(function() {
  console.log('rewnder!');
  if (this.data.onLoad && typeof this.data.onLoad === 'function') {
    this.$('img.safe-image').load(this.data.onLoad);
  }
});

