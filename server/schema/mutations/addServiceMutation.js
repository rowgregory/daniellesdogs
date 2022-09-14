const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const ServiceType = require('../types/objects/ServiceType.js');
const Service = require('../../models/Service.js');

const addServiceMutation = {
  type: ServiceType,
  args: {
    clientId: { type: new GraphQLNonNull(GraphQLID) },
    serviceType: { type: new GraphQLNonNull(GraphQLString) },
    frequency: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    console.log('args: ', args);
    const service = new Service({
      serviceType: args.serviceType,
      status: 'Inactive',
      frequency: args.frequency,
      amount: args.amount,
    });

    return service.save();
  },
};

module.exports = addServiceMutation;
