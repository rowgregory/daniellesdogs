const { GraphQLID, GraphQLNonNull } = require('graphql');
const ClientType = require('../types/objects/ClientType.js');
const Client = require('../../models/Client.js');

const deleteServiceFromClientMutation = {
  type: ClientType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    serviceId: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, args) {
    const client = await Client.findById(args.id);
    const filteredServices = client.services.filter(
      service => service._id.toString() !== args.serviceId
    );

    return Client.findByIdAndUpdate(
      args.id,
      {
        $set: { services: filteredServices },
      },
      { new: true }
    );
  },
};

module.exports = deleteServiceFromClientMutation;
