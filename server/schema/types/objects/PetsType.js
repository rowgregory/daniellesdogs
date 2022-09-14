const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require('graphql');
const VetInfoType = require('./VetInfoType.js');

const PetsType = new GraphQLObjectType({
  name: 'Pets',
  fields: () => ({
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
    vetInfo: { type: VetInfoType },
  }),
});

module.exports = PetsType;
