const User = require('../../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-express');

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
      console.log('FIRST NAME: ', firstName);
      try {
        const userExists = await User.findOne({ emailAddress });
        if (userExists) throw new Error('Invalid email or password');

        if (password !== confirmPassword)
          throw new Error('Passwords do not match');

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

        const res = await createdUser.save();
        return res;
      } catch (error) {
        throw new Error(error);
      }
    },
    async login(_, { loginInput: { emailAddress, password } }) {
      const user = await User.findOne({ emailAddress });

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

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
      }
    },
    async getRefreshToken(_, args) {
      console.log('args: ', args);
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
  },
};
