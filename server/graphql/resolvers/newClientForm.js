const NewClientForm = require('../../models/NewClientForm.js');
const Address = require('../../models/Address.js');
const Pet = require('../../models/Pet.js');
const Vet = require('../../models/Vet.js');
const User = require('../../models/User.js');
const writeToFile = require('../../utils/writeToFile.js');

module.exports = {
  Query: {
    getNewClientForms: async () => {
      return await NewClientForm.find({})
        .populate('vet', 'id name phoneNumber address')
        .populate('user', 'id firstName lastName emailAddress phoneNumber')
        .populate('pets', 'id name breedString')
        .populate('address', 'id addressLine1 city state zipPostalCode');
    },
    getNewClientFormById: async (_, { id }) => {
      return await NewClientForm.findById(id)
        .populate('vet', 'id name phoneNumber address')
        .populate('user', 'id firstName lastName emailAddress phoneNumber')
        .populate(
          'pets',
          'id name age breedString sex preferredTimeOfService harnessLocation dropOffLocation freeRoaming isSprayed allergies medications goodWithStrangers temperament'
        )
        .populate('address', 'id addressLine1 city state zipPostalCode');
    },
  },
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
          signedWaiver,
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
          signedWaiver,
        });

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.NEW_CLIENT_FORM_CREATE',
          `._id: ${createdNewClientForm._id}`
        );

        return createdNewClientForm;
      } catch (error) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.NEW_CLIENT_FORM_CREATE',
          `.error: ${err.message}`
        );
      }
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
      try {
        const updatedNewClientForm = await NewClientForm.findOneAndUpdate(
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

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.NEW_CLIENT_FORM_UPDATE',
          `._id: ${updatedNewClientForm._id}`
        );

        return updatedNewClientForm;
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.NEW_CLIENT_FORM_UPDATE',
          `.error: ${err.message}`
        );
      }
    },
    async deleteNewClientForm(_, { id, userId, petsId, vetId, addressId }) {
      try {
        const deletedNewClientForm = await NewClientForm.deleteOne({ _id: id });
        await User.deleteOne({ _id: userId });
        await Pet.deleteMany({ _id: petsId });
        await Vet.deleteOne({ _id: vetId });
        await Address.deleteOne({ _id: addressId });

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.NEW_CLIENT_FORM_DELETE',
          `.deletedNewClientForm: ${deletedNewClientForm.acknowledged}`
        );
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.NEW_CLIENT_FORM_DELETE',
          `.error: ${err.message}`
        );
      }
    },
  },
};
