const { Schema, SchemaTypes, model } = require('mongoose');

const NewClientFormSchema = Schema(
  {
    newClientForm: { type: String },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
    pets: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Pet',
      },
    ],
    vet: {
      type: SchemaTypes.ObjectId,
      ref: 'Vet',
    },
    address: {
      type: SchemaTypes.ObjectId,
      ref: 'Address',
    },
    openYard: { type: Boolean },
    afterMeetingNotes: { type: String },
    signedWaiver: {
      type: Boolean,
      default: false,
    },
    signedWaiverSignature: {
      type: String,
    },
    signedWaiverDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('NewClientForm', NewClientFormSchema);
