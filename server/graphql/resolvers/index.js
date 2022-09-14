const user = require('./user');
const newClientForm = require('./newClientForm');
const pet = require('./pet');

module.exports = {
  Query: {
    ...user.Query,
    ...newClientForm.Query,
    ...pet.Query,
  },
  Mutation: {
    ...user.Mutation,
    ...newClientForm.Mutation,
    ...pet.Mutation,
  },
};
