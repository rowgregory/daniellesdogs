const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  serviceType: { type: String },
  status: {
    type: String,
    enum: ['PENDING', 'INACTIVE', 'ACTIVE', 'CANCELLED'],
  },
  frequency: {
    type: String,
    enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'OTHER'],
  },
  amount: { type: String },
});

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
