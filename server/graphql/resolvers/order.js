const Order = require('../../models/Order.js');
const Product = require('../../models/Product.js');

module.exports = {
  Query: {
    getOrderById: async (_, { id }) => {
      try {
        const order = await Order.findById({ _id: id }).populate({
          path: 'orderItems.product',
        });

        if (order) {
          return order;
        }
      } catch (err) {
        console.log('ERROR: ', err);
      }
    },
    orderList: async () => {
      try {
        const orderList = await Order.find({}).populate('orderItems.product');

        return orderList;
      } catch (err) {
        writeToFile(
          '/server/logs/error.txt',
          '.🔴',
          '.ORDER_LIST',
          `.error: ${err.message}`
        );
      }
    },
  },
  Mutation: {
    createOrder: async (
      _,
      {
        orderInput: {
          shippingAddress,
          taxPrice,
          shippingPrice,
          totalPrice,
          paypalOrderId,
          orderItems,
          name,
          emailAddress,
          cellPhoneNumber,
          town,
        },
      }
    ) => {
      const newOrder = new Order({
        orderItems,
        shippingAddress,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidOn: new Date(),
        paypalOrderId,
        name,
        emailAddress,
        cellPhoneNumber,
        town,
      });

      const createdOrder = await newOrder.save();

      if (createdOrder) {
        for (const item of createdOrder.orderItems) {
          const product = await Product.findById(item.product);
          const objIndex = product?.sizes?.findIndex(
            obj => obj?.size === item?.size
          );

          if (product?.sizes?.length > 0) {
            const bulk = Product.collection.initializeOrderedBulkOp();
            bulk
              .find({ 'sizes.size': item.size, _id: product?._id })
              .updateOne({
                $set: {
                  'sizes.$.qty': product.sizes[objIndex].qty - item.qty,
                },
              });

            bulk
              .find({ 'sizes.size': item.size, _id: product?._id })
              .updateOne({
                $pull: {
                  sizes: {
                    qty: 0,
                  },
                },
              });

            bulk.execute();
          } else {
            product.countInStock = product.countInStock - item.qty;

            await product.save();
          }
        }
      }

      return createdOrder;
    },
    updateOrderToShipped: async (_, { id }) => {
      try {
        const order = await Order.findById(id);
        if (!order) return { success: false, message: 'No Order found' };

        order.isShipped = order.isShipped ? false : true;

        await order.save();

        return {
          success: true,
          message: 'Order updated to shipped successfully',
        };
      } catch (err) {
        console.log('ERROR: ', err);
        throw new Error('Failed to update order to shipped');
      }
    },
  },
};
