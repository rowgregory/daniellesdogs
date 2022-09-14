const { GraphQLID } = require('graphql');
const NewClientFormType = require('../types/objects/NewClientFormType.js');
const NewClientForm = require('../../models/NewClientForm.js');

const newClientForm = {
  type: NewClientFormType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return NewClientForm.findById(args.id);
  },
};

module.exports = newClientForm;
