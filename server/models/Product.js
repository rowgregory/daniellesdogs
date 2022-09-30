import { Schema, model, SchemaTypes } from 'mongoose';

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
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    publicId: {
      type: String,
    },
    size: {
      type: String,
    },
    isLimitedProduct: {
      type: Boolean,
    },
    sizes: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Product', ProductSchema, 'product');
