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
const cloudinary = require('cloudinary');
const multer = require('multer');
const streamifier = require('streamifier');
const GalleryImage = require('./models/GalleryImage.js');
const writeToFile = require('./utils/writeToFile');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

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
      createContactForm: allow,
      createBio: isAdmin,
      updateBio: isAdmin,
      deleteBio: isAdmin,
      deleteContactForm: isAdmin,
      createProduct: isAdmin,
      updateProduct: isAdmin,
      deleteProduct: isAdmin,
    },
  },
  {
    debug: true,
  }
);

const fileUpload = multer();

app
  .route('/upload')
  .post(fileUpload.single('image'), function (req, res, next) {
    try {
      let streamUpload = req => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.v2.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      async function upload(req) {
        try {
          let result = await streamUpload(req);

          if (req.body.isGalleryImage === 'true') {
            const createdGalleryImage = new GalleryImage({
              publicId: result.public_id,
              secureUrl: result.secure_url,
              height: result.height,
              width: result.width,
              format: result.format,
              bytes: result.bytes,
            });

            await createdGalleryImage.save();
          }

          writeToFile(
            '/server/logs/success.txt',
            '.🟢',
            '.IMAGE_UPLOAD',
            `.publicId: ${result.public_id}`
          );

          res.send({
            message: 'IMAGE_UPLOAD_SUCCESS',
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
        } catch (err) {
          writeToFile('/server/logs/error.txt', '.🔴', '.IMAGE_UPLOAD.', err);
          res.send(err.message);
        }
      }

      upload(req);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  });

app.route('/upload/:id').post((req, res, next) => {
  const publicId = req.params.id;
  try {
    cloudinary.uploader.destroy(publicId, result => {
      res.send(result);
    });
  } catch (error) {
    console.log('ERROR: ', error);
  }
});

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
