const ClientType = require('../types/objects/ClientType');
const { GraphQLID, GraphQLNonNull } = require('graphql');
const Client = require('../../models/Client');

const deleteClientMutation = {
  type: ClientType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    return Client.findByIdAndRemove(args.id);
  },
};

module.exports = deleteClientMutation;
