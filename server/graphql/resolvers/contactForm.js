const ContactForm = require('../../models/ContactForm.js');
const writeToFile = require('../../utils/writeToFile.js');

module.exports = {
  // Query: {
  //   async contactFormList() {
  //     return await ContactForm.find({});
  //   },
  // },
  Mutation: {
    async createContactForm(
      _,
      {
        contactFormInput: {
          firstName,
          lastName,
          emailAddress,
          subject,
          message,
        },
      }
    ) {
      try {
        const createdContactForm = await ContactForm.create({
          firstName,
          lastName,
          emailAddress,
          subject,
          message,
        });

        await createdContactForm.save();

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.CREATED_CONTACT_FORM',
          `._id: ${createdContactForm._id}`
        );
        return createdContactForm;
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.CREATED_CONTACT_FORM',
          `.error: ${err.message}`
        );
      }
    },
    // async deleteContactForm(_, { id }) {
    //   return await ContactForm.deleteOne({ _id: id });
    // },
  },
};
