const jwt = require('jsonwebtoken');

module.exports = context => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    if (token) {
      try {
        const user = jwt.verify(token, 'secret_password');
        return user;
      } catch (error) {
        res.status(401);
        throw new Error('Invalid/Expired token');
      }
    }
    throw new Error(`Authentication token must be 'Bearer [token] `);
  }
  throw new Error(`Authentication header must be provided`);
};
