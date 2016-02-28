Cloudinary.helpers = {
  getCard(cloudinaryId, options = {}) {
    if (cloudinaryId) {
      let baseOptions = {
        width: 600,
        height: 400,
        crop: 'fill',
        gravity: 'center'
      };
      let finalOptions = {
        ...baseOptions,
        ...options
      };
      return $.cloudinary.url(cloudinaryId, finalOptions);
    }
    return 'https://placehold.it/600x400';
  },
  getThumb(cloudinaryId) {
    if (cloudinaryId) {
      return $.cloudinary.url(cloudinaryId, {
        width: 150,
        height: 150,
        crop: 'thumb',
        gravity: 'face'
      });
    }
    return '/img/unknown-user.png';
  },
  getFetchImage(url) {
    if (url) {
      return $.cloudinary.url(url, {
        width: 400,
        height: 400,
        crop: 'fill',
        gravity: 'center',
        type: 'fetch'
      });
    }
    return 'https://placehold.it/400x400';
  }
};

Template.registerHelper('getCloudinaryCard', Cloudinary.helpers.getCard);
Template.registerHelper('getUserThumb', Cloudinary.helpers.getThumb);
Template.registerHelper('getCloudinaryFetchImage', Cloudinary.helpers.getFetchImage);
