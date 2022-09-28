const GalleryImage = require('../../models/GalleryImage.js');
const writeToFile = require('../../utils/writeToFile.js');

module.exports = {
  Query: {
    async galleryImageList() {
      try {
        const galleryImageList = await GalleryImage.find({});

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.GALLERY_IMAGE_LIST',
          `.totalImages: ${galleryImageList.length}`
        );

        return galleryImageList;
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.GALLERY_IMAGE_LIST',
          `.error: ${err.message}`
        );
      }
    },
  },
  Mutation: {
    async deleteGalleryImage(_, { id }) {
      try {
        const deletedGalleryImage = await GalleryImage.deleteOne({ _id: id });

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.DELETED_GALLERY_IMAGE',
          `.deletedCount: ${deletedGalleryImage.deletedCount}`
        );
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.DELETED_GALLERY_IMAGE',
          `.error: ${err.message}`
        );
      }
    },
  },
};
