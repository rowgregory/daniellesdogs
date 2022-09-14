const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
} = require('graphql');

const ServiceType = new GraphQLObjectType({
  name: 'Service',
  fields: () => ({
    serviceType: { type: GraphQLString },
    status: {
      type: new GraphQLEnumType({
        name: 'ServiceStatus',
        values: {
          pending: { value: 'Pending' },
          inactive: { value: 'Inactive' },
          active: { value: 'Active' },
          cancelled: { value: 'Cancelled' },
        },
      }),
    },
    frequency: {
      type: new GraphQLEnumType({
        name: 'ServiceFrequency',
        values: {
          daily: { value: 'Daily' },
          weekly: { value: 'Weekly' },
          monthly: { value: 'Monthly' },
          other: { value: 'Other' },
        },
      }),
    },
    amount: { type: GraphQLString },
  }),
});

module.exports = ServiceType;
