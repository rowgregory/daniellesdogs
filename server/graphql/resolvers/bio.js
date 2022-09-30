const Bio = require('../../models/Bio.js');
const writeToFile = require('../../utils/writeToFile.js');

module.exports = {
  Query: {
    async bioList() {
      return await Bio.find({});
    },

    async bioById(_, { id }) {
      try {
        const bio = await Bio.findById({ _id: id });

        if (bio) {
          writeToFile(
            '/server/logs/success.txt',
            '.🟢',
            '.BIO_BY_ID',
            `.id: ${bio.id}`
          );
          return bio;
        }
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.BIO_BY_ID',
          `.error: ${err.message}`
        );
      }
    },
  },
  Mutation: {
    async createBio(
      _,
      {
        bioInput: {
          firstName,
          lastName,
          emailAddress,
          title,
          description,
          image,
          publicId,
        },
      }
    ) {
      try {
        const createdBio = await Bio.create({
          firstName,
          lastName,
          emailAddress,
          title,
          description,
          image,
          publicId,
        });

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.CREATED_BIO',
          `.id: ${createdBio.id}`
        );

        return createdBio;
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.CREATED_BIO',
          `.error: ${err.message}`
        );
      }
    },
    async updateBio(
      _,
      {
        id,
        bioInput: {
          firstName,
          lastName,
          emailAddress,
          title,
          description,
          image,
          publicId,
        },
      }
    ) {
      try {
        const updatedBio = await Bio.findOneAndUpdate(
          { _id: id },
          {
            firstName,
            lastName,
            emailAddress,
            title,
            description,
            image,
            publicId,
          }
        );

        if (updatedBio) {
          writeToFile(
            '/server/logs/success.txt',
            '.🟢',
            '.UPDATE_BIO',
            `.id: ${updatedBio._id}`
          );

          return updatedBio;
        }
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.UPDATE_BIO',
          `.error: ${err.message}`
        );
      }
    },
    async deleteBio(_, { id }) {
      try {
        const deletedBio = await Bio.deleteOne({ _id: id });

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.DELETE_BIO',
          `.deletedCount: ${deletedBio.deletedCount}`
        );
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.DELETE_BIO',
          `.error: ${err.message}`
        );
      }
    },
  },
};
