  Cloudinary.config({
    cloud_name: Meteor.settings.public.CloudinaryName,
    api_key: Meteor.settings.CloudinaryAPIKey,
    api_secret: Meteor.settings.CloudinaryAPISecret,
  });
