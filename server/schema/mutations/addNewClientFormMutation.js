const {
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');
const NewClientForm = require('../../models/NewClientForm.js');
const NewClientFormType = require('../types/objects/NewClientFormType.js');

const addNewClientFormMutation = {
  type: NewClientFormType,
  args: {
    pinCode: { type: GraphQLString },
    keyLocation: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLString },
    breedString: { type: GraphQLString },
    sex: { type: GraphQLString },
    preferredTimeOfService: { type: GraphQLString },
    harnessLocation: { type: GraphQLString },
    dropOffLocation: { type: GraphQLString },
    freeRoaming: { type: GraphQLBoolean },
    isSprayed: { type: GraphQLBoolean },
    medications: { type: GraphQLString },
    allergies: { type: GraphQLString },
    temperament: { type: GraphQLString },
    goodWithStrangers: { type: GraphQLBoolean },
    vetName: { type: GraphQLString },
    vetAddress: { type: GraphQLString },
    vetPhoneNumber: { type: GraphQLString },
    clientId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    const newClientForm = NewClientForm({
      clientInfo: {
        pinCode: args.pinCode,
        keyLocation: args.keyLocation,
      },
      pets: {
        name: args.name,
        age: args.age,
        breedString: args.breedString,
        sex: args.sex,
        preferredTimeOfService: args.preferredTimeOfService,
        harnessLocation: args.harnessLocation,
        dropOffLocation: args.dropOffLocation,
        freeRoaming: args.freeRoaming,
        isSprayed: args.isSprayed,
        medications: args.medications,
        allergies: args.allergies,
        temperament: args.temperament,
        goodWithStrangers: args.goodWithStrangers,
        vetInfo: {
          vetName: args.vetName,
          vetAddress: args.vetAddress,
          vetPhoneNumber: args.vetPhoneNumber,
        },
      },
      clientId: args.clientId,
    });

    return newClientForm.save();
  },
};

module.exports = addNewClientFormMutation;
