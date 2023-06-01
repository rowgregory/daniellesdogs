const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  displayUrl: { type: String },
  title: { type: String },
  price: { type: String },
  description: { type: String },
});

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
