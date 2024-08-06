const { models } = require('../../config/dbconfig');
const channels = require('../../constants/channels.json');

async function ReadOrdersList(event, args) {
  const orders = await models.Order.findAll({
    order: [['createdAt', 'DESC']],
  });
  const ordersList = orders.map((c) => c.dataValues);

  await event.reply(channels.OrdersListReceive, ordersList);
}

module.exports = ReadOrdersList;
