const fs = require('fs');
const path = require('path');

const writeToFile = (filePath, status, type, info) => {
  const logItem = `${new Date()}${status}${type}${info}\n`;

  fs.appendFile(path.resolve() + filePath, logItem, 'utf8', err => {
    if (err) return console.log('File did not save: ', err);
    console.log(logItem);
  });
};

module.exports = writeToFile;
