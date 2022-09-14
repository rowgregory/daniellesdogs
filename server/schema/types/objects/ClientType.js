const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql');

const ServiceType = require('./ServiceType.js');

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    emailAddress: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    emailConfirmed: { type: GraphQLBoolean },
    services: { type: new GraphQLList(ServiceType) },
    password: { type: GraphQLString },
    isApproved: { type: GraphQLBoolean },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLString },
  }),
});

module.exports = ClientType;
