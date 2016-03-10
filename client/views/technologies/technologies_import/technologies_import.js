Template.technologiesImport.events({
  'change [name="csv"]': function(e, t) {
    Papa.parse(e.target.files[0], {
      header: true,
      complete(results, file) {
        t.results.set(results);
      }
    });
  },

  'click #import': function(e, t) {

    function asyncLoop(iterations, func, callback) {
      var index = 0;
      var done = false;
      var loop = {
        next: function() {
          if (done) {
            return;
          }

          if (index < iterations) {
            index++;
            func(loop);

          } else {
            done = true;
            callback();
          }
        },

        iteration: function() {
          return index - 1;
        },

        break: function() {
          done = true;
          callback();
        }
      };
      loop.next();
      return loop;
    }

    let parsedResults = t.parsedResults.get();
    parsedResults.forEach((item) => {
      let attachmentLinks = item.attachmentLinks.split(',').map((link) => link.trim());

      let images = [];
      asyncLoop(attachmentLinks.length, function(loop) {
        Meteor.call('uploadImageFromUrl', attachmentLinks[loop.iteration()], (error, fileId) => {
          images.push({
            src: fileId,
            description: 'No Description',
            showcased: false
          });

          loop.next();
        });

        Meteor.call('Technologies.methods.add', {
          name: item.name,
          images: images
        });
      });
    });
  }
})

Template.technologiesImport.helpers({
  parsedResults() {
    return Template.instance().parsedResults.get() || [];
  }
});

Template.technologiesImport.onCreated(function() {
  this.results = new ReactiveVar();
  this.parsedResults = new ReactiveVar();

  this.autorun(() => {
    let results = this.results.get();
    this.parsedResults.set(results && results.data.map(function(item) {
      return {
        id: item['Card ID'],
        name: item['Card Name'],
        url: item['Card URL'],
        description: item['Card Description'],
        attachmentLinks: item['Attachment Links']
      }
    }));
  });
});
