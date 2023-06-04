const { Schema, model } = require('mongoose');

const Waiver = Schema(
  {
    displayUrl: { type: String },
  },
  { timestaps: true }
);

module.exports = model('Waiver', Waiver);
