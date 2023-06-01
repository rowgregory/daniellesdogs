const { Schema, model } = require('mongoose');

const OrderSchema = Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        displayUrl: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        size: { type: String },
      },
    ],
    shippingAddress: {
      addressLine1: { type: String },
      city: { type: String },
      state: { type: String },
      zipPostalCode: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paidOn: {
      type: Date,
    },
    isShipped: {
      type: Boolean,
      default: false,
    },
    shippedOn: {
      type: Date,
    },
    paypalOrderId: {
      type: String,
    },
    name: { type: String },
    emailAddress: { type: String, match: /^\S+@\S+\.\S+$/ },
    cellPhoneNumber: { type: String },
    town: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Order', OrderSchema, 'order');
