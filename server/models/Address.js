const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  newClientForm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewClientForm',
  },
  addressLine1: { type: String },
  city: { type: String },
  state: { type: String },
  zipPostalCode: { type: String },
});

module.exports = mongoose.model('Address', AddressSchema, 'address');
