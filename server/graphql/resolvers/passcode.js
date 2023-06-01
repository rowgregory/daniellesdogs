module.exports = {
  Query: {
    async retreivePasscode(_, { passcodeAttempt }) {
      try {
        const passcode = process.env.REGISTER_KEY;

        if (passcode === passcodeAttempt) return true;
        else return false;
      } catch (err) {
        console.error('An error occurred:', err);
        return false;
      }
    },
  },
};
