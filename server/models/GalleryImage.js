const { Schema, model } = require('mongoose');

const GalleryImage = Schema(
  {
    linkKey: { type: String },
    publicId: { type: String },
    secureUrl: { type: String },
    width: { type: String },
    height: { type: String },
    format: { type: String },
    bytes: { type: String },
  },
  { timestaps: true }
);

module.exports = model('GalleryImage', GalleryImage);
