// Vet Info Type
const { GraphQLObjectType, GraphQLString } = require('graphql');

const VetInfoType = new GraphQLObjectType({
  name: 'VetInfo',
  fields: () => ({
    vetName: { type: GraphQLString },
    vetAddress: { type: GraphQLString },
    vetPhoneNumber: { type: GraphQLString },
  }),
});

module.exports = VetInfoType;
