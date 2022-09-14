const Service = require('../../models/Service.js');

module.exports = {
  Mutation: {
    async createService(_, { serviceInput: { serviceType, frequency } }) {
      console.log('BEGINNING OF CREATING SERVICE');
      try {
        let amount;
        if (serviceType === 'halfOurWalks') {
          amount = '30';
        } else {
          amount = '50';
        }
        const createdService = new Service({
          serviceType,
          frequency,
          status: 'INACTIVE',
          amount,
        });

        const res = await createdService.save();
        console.log('RESPONSE: ', res);
        return res;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Query: {
    async getServices() {
      return await Service.find({}).select(
        '_id serviceType frequency status amount'
      );
    },
    async getServiceById(_, { id }) {
      return await Service.findById(id);
    },
  },
};
