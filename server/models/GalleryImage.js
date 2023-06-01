const { Schema, model } = require('mongoose');

const GalleryImage = Schema(
  {
    displayUrl: { type: String },
    width: { type: Number },
    height: { type: Number },
    mimetype: { type: String },
    title: { type: String },
    size: { type: Number },
    mediumImgUrl: { type: String },
    thumbUrl: { type: String },
  },
  { timestaps: true }
);

module.exports = model('GalleryImage', GalleryImage);
