const { Schema, SchemaTypes, model } = require('mongoose');

const PetSchema = Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  },
  newClientForm: {
    type: SchemaTypes.ObjectId,
    ref: 'NewClientForm',
  },
  name: { type: String },
  age: { type: String },
  breedString: { type: String },
  sex: { type: String },
  preferredTimeOfService: { type: String },
  harnessLocation: { type: String },
  dropOffLocation: { type: String },
  freeRoaming: { type: Boolean },
  isSprayed: { type: Boolean },
  medications: { type: String },
  allergies: { type: String },
  temperament: { type: String },
  goodWithStrangers: { type: Boolean },
});

module.exports = model('Pet', PetSchema, 'pet');
