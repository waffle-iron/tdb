const DEFAULT_SIZE = 5;
const DEBOUNCE_DELAY = 50;

function isScrollOnBottom() {
  //  console.log('checking scroll on bottom ', $(document).height(), $(window).scrollTop(), $(window).height());
  return $(window).scrollTop() === $(document).height() - $(window).height();
}

function hasMoreData(searchSource, currentSize) {
  let metadata = searchSource.getMetadata();
  //  console.log('total: ', metadata.total);
  return metadata && metadata.total > currentSize;
}

function normalizeCurrentSize(searchSource, currentSize) {
  let metadata = searchSource.getMetadata();
  if (metadata && metadata.total) {
    if (currentSize.get() > metadata.total) {
      //  console.log('normalizing currentSize to ', metadata.total);
      Tracker.nonreactive(() => {
        currentSize.set(metadata.total);
      });
    }
  } else {
    currentSize.set(DEFAULT_SIZE);
  }
}

Template.searchSourceDisplay.onCreated(function() {
  this.size = new ReactiveVar(DEFAULT_SIZE);
  this.scrollOnBottom = new ReactiveVar(false);
  this.moreData = new ReactiveVar(false);

  this.autorun(() => {
    // só vamos assumir coisas se tiver carregado
    if (this.data.source.getStatus().loaded === true) {
      console.log('====antes====');
      console.log('running magic func');
      console.log('size ', this.size.get());
      console.log('scrollOnBottom ', this.scrollOnBottom.get());
      console.log('loaded ', this.data.source.getStatus().loaded);
      console.log('moreData ', this.moreData.get());
      // sempre que terminar de carregar, vejo se tem mais data
      
      normalizeCurrentSize(this.data.source, this.size);
      this.moreData.set(hasMoreData(this.data.source, this.size.get()));
      // scroll embaixo e tem mais data pra carregar
      if (this.scrollOnBottom.get() && this.moreData.get()) {
        // aumento tamanho
        this.size.set(this.size.get() + DEFAULT_SIZE);
        this.scrollOnBottom.set(false);
      }
      console.log('====depoissss====');
      console.log('running magic func');
      console.log('size ', this.size.get());
      console.log('scrollOnBottom ', this.scrollOnBottom.get());
      console.log('loaded ', this.data.source.getStatus().loaded);
      console.log('moreData ', this.moreData.get());
    }
  });
});

Template.searchSourceDisplay.onRendered(function() {
  window.addEventListener('resize', () => {
    //  console.log('scroll -> ', isScrollOnBottom());
    this.scrollOnBottom.set(isScrollOnBottom());
  });  
  window.addEventListener('scroll', () => {
    //  console.log('scroll -> ', isScrollOnBottom());
    this.scrollOnBottom.set(isScrollOnBottom());
  });

  this.scrollOnBottom.set(isScrollOnBottom());
});


Template.searchSourceDisplay.helpers({
  results: () => Template.instance().data.source.getTransformedData(),
  isLoading: () => Template.instance().data.source.getStatus().loading,
  options() {
    let t = Template.instance();
    return function() {
      let types;

      // If is a function that returns the array of entities
      if (typeof t.data.types === 'function') {
        types = t.data.types();
      } else {
        // If is an array like "attachments, organizations", mount the array
        types = t.data.types.split(',').map(type => type.trim());
      }

      if (!Array.isArray(types)) {
        throw new Error('types should be an array');
      }

      return {
        size: t.size.get(),
        types: types
      };
    };
  },
});