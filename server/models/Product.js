const { Schema, model, SchemaTypes } = require('mongoose');

const ProductSchema = Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
      required: true,
      default: 0,
    },
    countInStock: {
      type: String,
      default: 0,
    },
    publicId: {
      type: String,
    },
    sizes: [
      {
        size: String,
        qty: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Product', ProductSchema, 'product');
