Template.fetchImage.helpers({
  fetchSrc() {
  	console.log(Template.instance().data.width)
  	console.log(Template.instance().data.height)
    let img = $.cloudinary.image(Template.instance().data.src, {
      width: Template.instance().data.width,
      height: Template.instance().data.height,
      crop: 'fill',
      type: 'fetch'
    });
    return img[0].src;
  }
})
