const user = require('./user');
const newClientForm = require('./newClientForm');
const pet = require('./pet');
const galleryImage = require('./galleryImage');
const contactForm = require('./contactForm');
const bio = require('./bio');
const product = require('./product');
const passcode = require('./passcode');

module.exports = {
  Query: {
    ...user.Query,
    ...newClientForm.Query,
    ...pet.Query,
    ...galleryImage.Query,
    ...bio.Query,
    ...contactForm.Query,
    ...product.Query,
    ...passcode.Query,
  },
  Mutation: {
    ...user.Mutation,
    ...newClientForm.Mutation,
    ...pet.Mutation,
    ...galleryImage.Mutation,
    ...contactForm.Mutation,
    ...bio.Mutation,
    ...product.Mutation,
  },
};
