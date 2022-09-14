const Client = require('../../models/Client.js');
const ClientType = require('../types/objects/ClientType.js');
const { GraphQLID } = require('graphql');

const client = {
  type: ClientType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return Client.findById(args.id);
  },
};

module.exports = client;
