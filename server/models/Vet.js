const mongoose = require('mongoose');

const VetSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
});

module.exports = mongoose.model('Vet', VetSchema, 'vet');
