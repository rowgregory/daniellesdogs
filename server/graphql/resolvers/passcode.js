const writeToFile = require('../../utils/writeToFile.js');

module.exports = {
  Query: {
    async retreivePasscode() {
      try {
        const passcode = process.env.REGISTER_KEY;

        if (![null, undefined, ''].includes(passcode)) {
          writeToFile(
            '/server/logs/success.txt',
            '.🟢',
            '.RETREIVE_PASSCODE',
            `.passcode: ${passcode}`
          );
          return passcode;
        }
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.RETREIVE_PASSCODE',
          `.error: ${err.message}`
        );
      }
    },
  },
};
