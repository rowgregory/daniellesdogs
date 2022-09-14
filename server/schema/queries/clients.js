const Client = require('../../models/Client.js');
const ClientType = require('../types/objects/ClientType.js');
const { GraphQLList } = require('graphql');

const clients = {
  type: new GraphQLList(ClientType),
  resolve(parent, args) {
    return Client.find();
  },
};

module.exports = clients;
