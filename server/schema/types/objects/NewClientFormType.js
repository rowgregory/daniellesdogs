const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const PetsType = require('./PetsType.js');
const ClientInfoType = require('./ClientInfoType.js');
const ClientType = require('./ClientType.js');
const Client = require('../../../models/Client.js');

const NewClientFormType = new GraphQLObjectType({
  name: 'NewClientForm',
  fields: () => ({
    id: { type: GraphQLID },
    clientInfo: { type: ClientInfoType },
    pets: { type: new GraphQLList(PetsType) },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

module.exports = NewClientFormType;
