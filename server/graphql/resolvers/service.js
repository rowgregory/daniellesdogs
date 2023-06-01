const Service = require('../../models/Service.js');

module.exports = {
  Mutation: {
    async createService(
      _,
      { serviceInput: { displayUrl, title, price, description } }
    ) {
      try {
        const createdService = new Service({
          displayUrl,
          title,
          price,
          description,
        });

        const savedService = await createdService.save();
        return savedService;
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateService(
      _,
      { id, serviceInput: { title, price, displayUrl, description } }
    ) {
      try {
        const updatedBio = await Service.findOneAndUpdate(
          { _id: id },
          {
            title,
            price,
            displayUrl,
            description,
          }
        );

        return updatedBio;
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.SERVICE_UPDATE',
          `.error: ${err.message}`
        );
      }
    },
    async deleteService(_, { id }) {
      try {
        await Service.deleteOne({ _id: id });

        return 'success';
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.BIO_DELETE',
          `.error: ${err.message}`
        );
      }
    },
  },
  Query: {
    async serviceList() {
      return await Service.find({});
    },
    async serviceById(_, { id }) {
      return await Service.findById(id);
    },
  },
};
