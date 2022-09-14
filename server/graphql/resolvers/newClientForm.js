const NewClientForm = require('../../models/NewClientForm.js');
const Address = require('../../models/Address.js');
const Pet = require('../../models/Pet.js');
const Vet = require('../../models/Vet.js');
const User = require('../../models/User.js');

module.exports = {
  Mutation: {
    async createNewClientForm(
      _,
      {
        newClientFormInput: {
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          address,
          openYard,
          pets,
          vet,
          afterMeetingNotes,
        },
      }
    ) {
      try {
        const createdVets = await Vet.create({
          name: vet.name,
          phoneNumber: vet.phoneNumber,
          address: vet.address,
        });

        const createdPet = await Pet.insertMany(pets);

        const createdAddress = await Address.create({
          addressLine1: address.addressLine1,
          city: address.city,
          state: address.state,
          zipPostalCode: address.zipPostalCode,
        });

        const createdUser = await User.create({
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          userType: 'CLIENT',
          address: createdAddress._id,
        });

        const createdNewClientForm = await NewClientForm.create({
          openYard,
          pets: createdPet.map(id => id),
          vet: createdVets._id,
          afterMeetingNotes,
          address: createdAddress._id,
          user: createdUser._id,
        });

        return createdNewClientForm;
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteNewClientForm(_, { id, userId, petsId, vetId, addressId }) {
      const deletedNewClientForm = (await NewClientForm.deleteOne({ _id: id }))
        .deletedCount;
      const deletedUser = (await User.deleteOne({ _id: userId })).deletedCount;
      const deletedPet = (await Pet.deleteMany({ _id: petsId })).deletedCount;
      const deletedVet = (await Vet.deleteOne({ _id: vetId })).deletedCount;
      const deletedAddress = (await Address.deleteOne({ _id: addressId }))
        .deletedCount;

      console.log('deletedNewClientForm: ', deletedNewClientForm);
      console.log('deletedUser: ', deletedUser);
      console.log('deletedPet: ', deletedPet);
      console.log('deletedVet: ', deletedVet);
      console.log('deletedAddress: ', deletedAddress);
    },
    async updateNewClientForm(
      _,
      {
        id,
        userId,
        addressId,
        vetId,
        newClientFormEditInput: {
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          address,
          openYard,
          vet,
          afterMeetingNotes,
        },
      }
    ) {
      const updatedNewClientForm = await NewClientForm.updateOne(
        { _id: id },
        {
          openYard,
          afterMeetingNotes,
        }
      );

      await User.updateOne(
        { _id: userId },
        {
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
        }
      );

      await Address.updateOne(
        { _id: addressId },
        {
          addressLine1: address.addressLine1,
          city: address.city,
          state: address.state,
          zipPostalCode: address.zipPostalCode,
        }
      );

      await Vet.updateOne(
        { _id: vetId },
        {
          name: vet.name,
          phoneNumber: vet.phoneNumber,
          address: vet.address,
        }
      );

      return updatedNewClientForm;
    },
  },
  Query: {
    getNewClientForms: async (_, __, context) => {
      if (context.auth.user_type === 'ADMIN') {
        return await NewClientForm.find({})
          .populate('vet', 'id name phoneNumber address')
          .populate('user', 'id firstName lastName emailAddress phoneNumber')
          .populate('pets', 'id name breedString')
          .populate('address', 'id addressLine1 city state zipPostalCode');
      }
    },
    getNewClientFormById: async (_, { id }, context) => {
      if (context.auth.user_type === 'ADMIN') {
        return await NewClientForm.findById(id)
          .populate('vet', 'id name phoneNumber address')
          .populate('user', 'id firstName lastName emailAddress phoneNumber')
          .populate(
            'pets',
            'id name age breedString sex preferredTimeOfService harnessLocation dropOffLocation freeRoaming isSprayed allergies medications goodWithStrangers temperament'
          )
          .populate('address', 'id addressLine1 city state zipPostalCode');
      }
    },
  },
};
