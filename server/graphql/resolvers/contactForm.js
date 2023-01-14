const ContactForm = require('../../models/ContactForm.js');
const writeToFile = require('../../utils/writeToFile.js');

module.exports = {
  Query: {
    async contactFormList() {
      try {
        const contactFormList = await ContactForm.find({});

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.CONTACT_FORM_LIST',
          `.totalContactForms: ${contactFormList.length}`
        );

        return contactFormList;
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.CONTACT_FORM_LIST',
          `.error: ${err.message}`
        );
      }
    },
    async contactFormById(_, { id }) {
      try {
        const contactForm = await ContactForm.findById({ _id: id });

        if (contactForm) {
          writeToFile(
            '/server/logs/success.txt',
            '.🟢',
            '.CONTACT_FORM_BY_ID',
            `.id: ${contactForm.id}`
          );
          return contactForm;
        }
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.CONTACT_FORM_BY_ID',
          `.error: ${err.message}`
        );
      }
    },
  },
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
    async deleteContactForm(_, { id }) {
      try {
        const deletedContactForm = await ContactForm.deleteOne({ _id: id });

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.CONTACT_FORM_DELETE',
          `.deletedCount: ${deletedContactForm.deletedCount}`
        );
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.CONTACT_FORM_DELETE',
          `.error: ${err.message}`
        );
      }
    },
  },
};
