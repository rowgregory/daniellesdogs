const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const addClientMutation = require('./mutations/addClientMutation.js');
const deleteClientMutation = require('./mutations/deleteClientMutation.js');
const addNewClientFormMutation = require('./mutations/addNewClientFormMutation.js');
const deleteNewClientFormMutation = require('./mutations/deleteNewClientFormMutation.js');
const clients = require('./queries/clients.js');
const client = require('./queries/client.js');
const newClientForms = require('./queries/newClientForms.js');
const newClientForm = require('./queries/newClientForm.js');
const login = require('./queries/login.js');
const addServiceMutation = require('./mutations/addServiceMutation.js');
const addServiceToClientMutation = require('./mutations/addServiceToClientMutation.js');
const deleteServiceFromClientMutation = require('./mutations/deleteServiceFromClientMutation.js');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients,
    client,
    newClientForms,
    newClientForm,
    login,
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: addClientMutation,
    deleteClient: deleteClientMutation,
    addNewClientForm: addNewClientFormMutation,
    deleteNewClientForm: deleteNewClientFormMutation,
    addService: addServiceMutation,
    addServiceToClient: addServiceToClientMutation,
    deleteServiceFromClient: deleteServiceFromClientMutation,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
