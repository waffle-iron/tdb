Meteor.startup(function() {
  console.log($.cloudinary.image('http://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg', {
    radius: 'max',
    width: 300,
    height: 300,
    crop: 'fill',
    gravity: 'face',
    fetch_format: 'auto',
    type: 'fetch'
  }));
});
