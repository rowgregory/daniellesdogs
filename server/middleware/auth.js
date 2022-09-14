const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

module.exports = context => {
  const authHeader = context.req.headers.authorization;
  console.log('AUTH HEADER: ', authHeader);

  if (authHeader) {
    if (token) {
      try {
        const user = jwt.verify(token, 'secret_password');
        return user;
      } catch (error) {
        res.status(401);
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error(`Authentication token must be 'Bearer [token] `);
  }
  throw new Error(`Authentication header must be provided`);
};
