const Pet = require('../../models/Pet.js');
const NewClientForm = require('../../models/NewClientForm.js');

module.exports = {
  Mutation: {
    async updatePet(
      _,
      {
        id,
        petEditInput: {
          name,
          age,
          breedString,
          sex,
          preferredTimeOfService,
          harnessLocation,
          dropOffLocation,
          freeRoaming,
          isSprayed,
          medications,
          allergies,
          temperament,
          goodWithStrangers,
        },
      }
    ) {
      const updatedPet = await Pet.updateOne(
        { _id: id },
        {
          name,
          age,
          breedString,
          sex,
          preferredTimeOfService,
          harnessLocation,
          dropOffLocation,
          freeRoaming,
          isSprayed,
          medications,
          allergies,
          temperament,
          goodWithStrangers,
        }
      );

      return updatedPet;
    },
    async createPet(
      _,
      {
        id,
        petCreateInput: {
          name,
          age,
          breedString,
          sex,
          preferredTimeOfService,
          harnessLocation,
          dropOffLocation,
          freeRoaming,
          isSprayed,
          medications,
          allergies,
          temperament,
          goodWithStrangers,
        },
      }
    ) {
      try {
        const createdPet = await Pet.create({
          name,
          age,
          breedString,
          sex,
          preferredTimeOfService,
          harnessLocation,
          dropOffLocation,
          freeRoaming,
          isSprayed,
          medications,
          allergies,
          temperament,
          goodWithStrangers,
        });

        await NewClientForm.updateOne(
          { _id: id },
          {
            $push: { pets: createdPet.id },
          }
        );

        return createdPet;
      } catch (error) {
        throw new Error(error);
      }
    },
    async deletePet(_, { id }) {
      return await Pet.deleteOne({ _id: id });
    },
  },
  Query: {
    async getPetById(_, { id }) {
      return await Pet.findById(id);
    },
  },
};
