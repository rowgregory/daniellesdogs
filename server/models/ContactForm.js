const { Schema, model } = require('mongoose');

const ContactForm = Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    emailAddress: { type: String },
    subject: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

module.exports = model('ContactForm', ContactForm);
