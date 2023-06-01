require('dotenv').config();
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const { shield, rule, allow } = require('graphql-shield');
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
const { InMemoryLRUCache } = require('@apollo/utils.keyvaluecache');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

const httpServer = http.createServer(app);

const port = process.env.PORT || 5000;

const isAdmin = rule()(async (_, __, ctx) => {
  if (!ctx.auth) throw new ApolloError('not_authorized', 'NOT AUTHORIZED');
  else return ctx.auth.user_type === 'ADMIN';
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

const createContext = ({ req, res }) => {
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
      getUserByEmail: allow,
      getNewClientForms: isAdmin,
      getNewClientFormById: isAdmin,
      getPetById: isAdmin,
      galleryImageList: allow,
      bioList: allow,
      bioById: isAdmin,
      contactFormList: isAdmin,
      contactFormById: isAdmin,
      productList: allow,
      productById: allow,
      retreivePasscode: allow,
      getOrderById: allow,
      orderList: isAdmin,
      getOrdersClientsGalleryImagesContactFormsTotals: isAdmin,
      getSalesByMonth: isAdmin,
      getTransformedNewClientForm: isAdmin,
      getRecentOrders: isAdmin,
      serviceList: allow,
      serviceById: isAdmin,
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
      deleteGalleryImage: isAdmin,
      createGalleryImage: isAdmin,
      createContactForm: allow,
      createBio: isAdmin,
      updateBio: isAdmin,
      deleteBio: isAdmin,
      deleteContactForm: isAdmin,
      createProduct: isAdmin,
      updateProduct: isAdmin,
      deleteProduct: isAdmin,
      createOrder: allow,
      logoutUser: allow,
      createService: isAdmin,
      updateService: isAdmin,
      deleteService: isAdmin,
      updateOrderToShipped: isAdmin,
    },
  },
  {
    debug: true,
  }
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

const schemaWithPermissions = applyMiddleware(schema, permissions);

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

const corsOptions = {
  origin: ['https://danielles-dogs.herokuapp.com'],
};

server.start().then(res => {
  server.applyMiddleware({ app, cors: corsOptions, path: '/graphql' });

  app.listen({ port }, () =>
    console.log(`Gateway API running at port: ${port}`.yellow)
  );
});
