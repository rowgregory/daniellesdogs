const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');
const Client = require('../../models/Client');
const ClientType = require('../types/objects/ClientType');

const addServiceToClientMutation = {
  type: ClientType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    clientId: { type: new GraphQLNonNull(GraphQLID) },
    serviceType: { type: new GraphQLNonNull(GraphQLString) },
    frequency: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args) {
    const newService = {
      id: args.id,
      clientId: args.clientId,
      serviceType: args.serviceType,
      frequency: args.frequency,
      amount: args.amount,
      status: 'Inactive',
    };

    const clientServices = await Client.findById(args.clientId).select(
      'services'
    );

    const services = clientServices.services.concat(newService);

    return Client.findByIdAndUpdate(
      args.clientId,
      {
        $set: { services: services },
      },
      { new: true }
    );
  },
};

module.exports = addServiceToClientMutation;
