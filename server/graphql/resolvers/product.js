const Product = require('../../models/Product.js');
const writeToFile = require('../../utils/writeToFile.js');

module.exports = {
  Query: {
    async productList() {
      try {
        const prodoctList = await Product.find({});

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.PRODUCT_LIST',
          `.totalProducts: ${prodoctList.length}`
        );

        return prodoctList;
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.PRODUCT_LIST',
          `.error: ${err.message}`
        );
      }
    },
    async productById(_, { id }) {
      try {
        const product = await Product.findById({ _id: id });

        if (product) {
          writeToFile(
            '/server/logs/success.txt',
            '.🟢',
            '.PRODUCT_BY_ID',
            `.id: ${product.id}`
          );
          return product;
        }
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.PRODUCT_BY_ID',
          `.error: ${err.message}`
        );
      }
    },
  },
  Mutation: {
    async createProduct(
      _,
      {
        productInput: {
          name,
          image,
          description,
          price,
          countInStock,
          publicId,
          isLimitedProduct,
          sizes,
        },
      }
    ) {
      try {
        const createdProduct = await Product.create({
          name,
          image,
          description,
          price,
          countInStock,
          publicId,
          isLimitedProduct,
          sizes,
        });

        await createdProduct.save();

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.PRODUCT_CREATE',
          `._id: ${createdProduct._id}`
        );
        return createdProduct;
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.PRODUCT_CREATE',
          `.error: ${err.message}`
        );
      }
    },
    async updateProduct(
      _,
      {
        id,
        productInput: {
          name,
          image,
          description,
          price,
          countInStock,
          publicId,
          isLimitedProduct,
          sizes,
        },
      }
    ) {
      try {
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: id },
          {
            name,
            image,
            description,
            price,
            countInStock,
            publicId,
            isLimitedProduct,
            sizes,
          }
        );

        await updatedProduct.save();

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.PRODUCT_UPDATE',
          `._id: ${updatedProduct._id}`
        );
        return updatedProduct;
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.PRODUCT_UPDATE',
          `.error: ${err.message}`
        );
      }
    },
    async deleteProduct(_, { id }) {
      try {
        const deletedProduct = await Product.deleteOne({ _id: id });

        writeToFile(
          '/server/logs/success.txt',
          '.🟢',
          '.PRODUCT_DELETE',
          `.deletedCount: ${deletedProduct.deletedCount}`
        );
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.PRODUCT_DELETE',
          `.error: ${err.message}`
        );
      }
    },
  },
};
