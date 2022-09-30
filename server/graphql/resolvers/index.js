const user = require('./user');
const newClientForm = require('./newClientForm');
const pet = require('./pet');
const galleryImage = require('./galleryImage');
const contactForm = require('./contactForm');
const bio = require('./bio');

module.exports = {
  Query: {
    ...user.Query,
    ...newClientForm.Query,
    ...pet.Query,
    ...galleryImage.Query,
    ...bio.Query,
    ...contactForm.Query,
  },
  Mutation: {
    ...user.Mutation,
    ...newClientForm.Mutation,
    ...pet.Mutation,
    ...galleryImage.Mutation,
    ...contactForm.Mutation,
    ...bio.Mutation,
  },
};
