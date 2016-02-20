Cloudinary.config({
  cloud_name: Meteor.settings.public.CloudinaryName,
  api_key: Meteor.settings.Cloudinary.accessKeyId,
  api_secret: Meteor.settings.Cloudinary.secretAccessKey,
});
