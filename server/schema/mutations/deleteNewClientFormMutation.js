const { GraphQLID, GraphQLNonNull } = require('graphql');
const NewClientFormType = require('../types/objects/NewClientFormType.js');
const NewClientForm = require('../../models/NewClientForm.js');

const deleteNewClientFormMutation = {
  type: NewClientFormType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    return NewClientForm.findByIdAndRemove(args.id);
  },
};

module.exports = deleteNewClientFormMutation;
