const { GraphQLObjectType, GraphQLString } = require('graphql');

const ClientInfoType = new GraphQLObjectType({
  name: 'ClientInfo',
  fields: () => ({
    pinCode: { type: GraphQLString },
    keyLocation: { type: GraphQLString },
  }),
});

module.exports = ClientInfoType;
