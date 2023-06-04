const Order = require('../../models/Order.js');
const NewClientForm = require('../../models/NewClientForm.js');
const GalleryImage = require('../../models/GalleryImage.js');
const ContactForm = require('../../models/ContactForm.js');

module.exports = {
  Query: {
    async getOrdersClientsGalleryImagesContactFormsTotals() {
      try {
        const [
          ordersCount,
          newClientFormsCount,
          galleryImagesCount,
          contactFormsCount,
        ] = await Promise.all([
          Order.countDocuments(),
          NewClientForm.countDocuments(),
          GalleryImage.countDocuments(),
          ContactForm.countDocuments(),
        ]);

        return {
          orderCount: ordersCount,
          newClientFormCount: newClientFormsCount,
          galleryImageCount: galleryImagesCount,
          contactFormCount: contactFormsCount,
        };
      } catch (err) {
        console.error(err);
      }
    },
    async getSalesByMonth() {
      try {
        const dataset = await Order.aggregate([
          {
            $group: {
              _id: { $month: '$createdAt' },
              totalSales: { $sum: '$totalPrice' },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ]);

        const datasets = Array.from({ length: 12 }, (_, i) => {
          const month = i + 1;
          const item = dataset.find(d => d._id === month);
          return item ? item.totalSales : 0;
        });

        return { datasets };
      } catch (err) {
        console.error(err);
      }
    },
    async getTransformedNewClientForm() {
      try {
        const clients = await NewClientForm.find({})
          .populate({
            path: 'user',
            select: 'firstName lastName emailAddress phoneNumber',
          })
          .populate({
            path: 'pets',
            select: 'name',
          });
        if (clients) {
          const transformedClients = clients.map(client => ({
            id: client?.id,
            firstName: client?.user?.firstName,
            lastName: client?.user?.lastName,
            phoneNumber: client?.user?.phoneNumber,
            emailAddress: client?.user?.emailAddress,
            pets: client?.pets?.map(pet => pet?.name),
          }));

          return transformedClients;
        }
      } catch (err) {
        console.error(err);
      }
    },
    async getRecentOrders() {
      try {
        const orders = await Order.find({});

        const recentOrders = orders.map(order => ({
          displayUrl: order.orderItems[0].displayUrl,
          name: order.name,
          productName: order.orderItems[0].name,
          totalPrice: Number(order.totalPrice),
          id: order._id,
        }));

        return recentOrders;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
