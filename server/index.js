require('dotenv').config();
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const { ApolloServer } = require('apollo-server');
const { shield, rule, allow, deny } = require('graphql-shield');
const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-express');
const colors = require('colors');

const port = process.env.PORT || 5000;

const isAdmin = rule()(async (_, __, ctx) => {
  console.log('IS ADMIN CONTEXT: ', ctx);
  if (!ctx.auth) throw new ApolloError('not_authorized', 'NOT AUTHORIZED');
  else return ctx.auth.user_type === 'ADMIN';
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

const createContext = ({ req }) => {
  const { headers } = req;
  let auth = null;

  const token = headers?.authorization?.split(' ')[1];
  if (token) {
    const user = jwt.verify(token, 'secret_password');
    console.log('user: ', user);
    if (user) auth = user;
  } else auth = null;

  return { auth };
};

const permissions = shield(
  {
    Query: {
      getNewClientForms: isAdmin,
      getNewClientFormById: isAdmin,
      getPetById: isAdmin,
    },
    Mutation: {
      login: allow,
      register: allow,
      createNewClientForm: allow,
      deleteNewClientForm: isAdmin,
      updateNewClientForm: isAdmin,
      updatePet: isAdmin,
      createPet: isAdmin,
      deletePet: isAdmin,
      getRefreshToken: allow,
    },
  },
  {
    debug: true,
  }
);

const schemaWithPermissions = applyMiddleware(schema, permissions);

connectDB();

const server = new ApolloServer({
  schema: schemaWithPermissions,
  context: createContext,
  introspection: true,
});

server.listen(port, console.log(`Server running on port ${port}`.yellow));
