const Client = require('../../models/Client.js');
const ClientType = require('../types/objects/ClientType.js');
const { GraphQLString, GraphQLNonNull } = require('graphql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addClientMutation = {
  type: ClientType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    emailAddress: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args) {
    try {
      const userExists = await Client.findOne({
        emailAddress: args.emailAddress,
      });
      if (userExists) throw new Error('Invalid email or password');

      const hashedPassword = await bcrypt.hash(args.password, 12);

      console.log('ARE WE HERE');

      const token = jwt.sign(
        { emailAddress: args.emailAddress },
        'secret_password',
        {
          expiresIn: '1hr',
        }
      );

      const client = new Client({
        firstName: args.firstName,
        lastName: args.lastName,
        emailAddress: args.emailAddress,
        phoneNumber: args.phoneNumber,
        emailConfirmed: false,
        password: hashedPassword,
        isApproved: false,
        token,
        tokenExpiration: '',
      });
      return client.save();
    } catch (error) {
      throw new Error('User not created');
    }
  },
};

module.exports = addClientMutation;
