require('dotenv').config();
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
// const { ApolloServer } = require('apollo-server');
const { shield, rule, allow, deny } = require('graphql-shield');
const jwt = require('jsonwebtoken');
const { ApolloError, ApolloServer } = require('apollo-server-express');
const colors = require('colors');
const path = require('path');
const express = require('express');
const http = require('http');
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');
// Apollo Server's default caching features use an unbounded cache,
// which is not safe for production use. If you want to configure
// the in-memory cache, Apollo provides the InMemoryLRUCache class
// from the @apollo/utils.keyvaluecache package
const { InMemoryLRUCache } = require('@apollo/utils.keyvaluecache');

const app = express();

const httpServer = http.createServer(app);

const port = process.env.PORT || 5000;

const isAdmin = rule()(async (_, __, ctx) => {
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const schemaWithPermissions = applyMiddleware(schema, permissions);

connectDB();

const server = new ApolloServer({
  schema: schemaWithPermissions,
  context: createContext,
  csrfPrevention: true,
  introspection: process.env.NODE_ENV !== 'production',
  cache: new InMemoryLRUCache(),
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

server.start().then(res => {
  server.applyMiddleware({ app, path: '/' });

  app.listen({ port }, () =>
    console.log(`Gateway API running at port: ${port}`.yellow)
  );
});

// server.listen(port, console.log(`Server running on port ${port}`.yellow));
