const User = require('../../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const writeToFile = require('../../utils/writeToFile.js');

module.exports = {
  Mutation: {
    async register(
      _,
      {
        registerInput: {
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          password,
          confirmPassword,
        },
      }
    ) {
      try {
        const userExists = await User.findOne({ emailAddress });
        if (userExists) {
          writeToFile(
            '/server/logs/error.txt',
            '.🔴',
            '.REGISTER_USER',
            `.error: user already exists`
          );
          throw new Error('Invalid email or password');
        }

        if (password !== confirmPassword) {
          writeToFile(
            '/server/logs/error.txt',
            '.🔴',
            '.REGISTER_USER',
            `.error: passwords do not match`
          );
          throw new Error('Passwords do not match');
        }

        const olympiasEmail = process.env.OLYMPIA_EMAIL_ADDRESS;
        const daniellesEmail = process.env.DANIELLE_EMAIL_ADDRESS;

        if (emailAddress !== olympiasEmail && emailAddress !== daniellesEmail) {
          writeToFile(
            '/server/logs/error.txt',
            '.🔴',
            '.REGISTER_USER',
            `.error: user tried ${emailAddress}`
          );
          throw new Error('Invalid email or password');
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const token = jwt.sign(
          { emailAddress, user_type: 'ADMIN' },
          'secret_password',
          {
            expiresIn: '1hr',
          }
        );

        const createdUser = new User({
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          password: hashedPassword,
          isApproved: true,
          token,
          tokenExpiration: '',
          userType: 'ADMIN',
        });

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.REGISTER_USER',
          `.user: ${emailAddress}`
        );

        const res = await createdUser.save();
        return res;
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.REGISTER_USER',
          `.error: ${err.message}`
        );
        throw new Error(err.message);
      }
    },
    async login(_, { loginInput: { emailAddress, password } }) {
      try {
        const user = await User.findOne({ emailAddress });

        if (!user) {
          writeToFile(
            '/server/logs/error.txt',
            '.🔴',
            '.LOGIN_USER',
            `.error: user not found`
          );
          throw new Error('Incorrect email address or password');
        }

        if (user && (await bcrypt.compare(password, user.password))) {
          const accessToken = jwt.sign(
            {
              user_id: user._id,
              first_name: user.firstName,
              last_name: user.lastName,
              email_address: emailAddress,
              user_type: user.userType,
            },
            'secret_password',
            {
              expiresIn: '1hr',
            }
          );

          user.token = accessToken;

          writeToFile(
            '/server/logs/success.txt',
            '.🟢',
            '.LOGIN_USER',
            `.user: ${emailAddress}`
          );

          return {
            id: user.id,
            ...user._doc,
          };
        } else {
          writeToFile(
            '/server/logs/error.txt',
            '.🔴',
            '.LOGIN_USER',
            `.error: passwords do not match`
          );
          throw new Error('Incorrect email address or password');
        }
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.LOGIN_USER',
          `.error: ${err.message}`
        );
        throw new Error(err.message);
      }
    },
    async getRefreshToken(_, args) {
      return {
        accessToken: jwt.sign(
          { user_type: args.userType, first_name: args.firstName },
          'secret_password',
          {
            expiresIn: '7d',
          }
        ),
        refreshToken: jwt.sign(
          { user_type: args.userType, first_name: args.firstName },
          'secret_password',
          {
            expiresIn: '7d',
          }
        ),
      };
    },
  },
  Query: {
    async getUsers() {
      return await User.find({})
        .populate('address')
        .populate({
          path: 'newClientForm',
          model: 'NewClientForm',
          populate: {
            path: 'pets',
            model: 'Pet',
          },
        })
        .populate({
          path: 'newClientForm',
          model: 'NewClientForm',
          populate: {
            path: 'vet',
            model: 'Vet',
          },
        });
    },
    async getUserById(_, { id }) {
      return await User.findById(id)
        .populate('address')
        .populate({
          path: 'newClientForm',
          model: 'NewClientForm',
          populate: {
            path: 'pets',
            model: 'Pet',
          },
        })
        .populate({
          path: 'newClientForm',
          model: 'NewClientForm',
          populate: {
            path: 'vet',
            model: 'Vet',
          },
        });
    },
    async getUserByEmail(_, { emailAddress }) {
      try {
        if (emailAddress) {
          const user = await User.findOne({ emailAddress });
          if (user)
            throw new Error(
              `Looks like you've already set up an account with that email. Please call.`
            );

          return true;
        } else return false;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};
