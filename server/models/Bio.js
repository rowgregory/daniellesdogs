const { Schema, model } = require('mongoose');

const Bio = Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    emailAddress: { type: String },
    title: { type: String },
    description: { type: String },
    image: { type: String },
    publicId: { type: String },
  },
  { timestaps: true }
);

module.exports = model('Bio', Bio);
