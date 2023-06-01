const user = require('./user');
const newClientForm = require('./newClientForm');
const pet = require('./pet');
const galleryImage = require('./galleryImage');
const contactForm = require('./contactForm');
const bio = require('./bio');
const product = require('./product');
const passcode = require('./passcode');
const order = require('./order');
const dashboard = require('./dashboard');
const service = require('./service');

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
    ...order.Query,
    ...dashboard.Query,
    ...service.Query,
  },
  Mutation: {
    ...user.Mutation,
    ...newClientForm.Mutation,
    ...pet.Mutation,
    ...galleryImage.Mutation,
    ...contactForm.Mutation,
    ...bio.Mutation,
    ...product.Mutation,
    ...order.Mutation,
    ...service.Mutation,
  },
};
