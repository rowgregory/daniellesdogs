const Waiver = require('../../models/Waiver.js');

module.exports = {
  Query: {
    async getWaiver() {
      try {
        const waivers = await Waiver.find();

        if (!waivers) return 'Waiver not found';

        return waivers;
      } catch (err) {
        console.error('GET_WAIVER', err.message);
      }
    },
  },
  Mutation: {
    async createWaiver(_, { displayUrl }) {
      try {
        const createdWaiver = await Waiver.create({
          displayUrl,
        });
        if (!createdWaiver) return 'Waiver not created';

        return createdWaiver;
      } catch (err) {
        console.error('CREATE_WAIVER', err.message);
      }
    },
    async deleteWaiver(_, { id }) {
      try {
        const deletedWaiver = await Waiver.deleteOne({ _id: id });
        if (!deletedWaiver) return 'Waiver not deleted';

        return deletedWaiver;
      } catch (err) {
        console.error('DELETED_WAIVER', err.message);
      }
    },
  },
};
