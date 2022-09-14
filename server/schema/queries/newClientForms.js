const { GraphQLList } = require('graphql');
const NewClientFormType = require('../types/objects/NewClientFormType');
const NewClientForm = require('../../models/NewClientForm.js');

const newClientForms = {
  type: new GraphQLList(NewClientFormType),
  resolve(parent, args) {
    return NewClientForm.find();
  },
};

module.exports = newClientForms;
