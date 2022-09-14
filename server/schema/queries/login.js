const Client = require('../../models/Client.js');
const ClientType = require('../types/objects/ClientType.js');
const { GraphQLString, GraphQLNonNull } = require('graphql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = {
  type: ClientType,
  args: {
    emailAddress: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args, req) {
    console.log('REQ ISAUTH: ', req.isAuth);
    const client = await Client.findOne({ emailAddress: args.emailAddress });
    if (!client) throw new Error('User does not exist!');

    const isMatch = await bcrypt.compare(args.password, client.password);

    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { clientId: client._id, emailAddress: client.emailAddress },
      'secret_password',
      {
        expiresIn: '1hr',
      }
    );

    return { ...client._doc, password: null, token, tokenExpiration: '1' };
  },
};

module.exports = login;
