const { models } = require('../../config/dbconfig');
const channels = require('../../constants/channels.json');

async function GetClientOrders(event, data) {
  const ClientId = data.id;
  console.log('============= CLIENT ID ==============', data);
  const orders = await models.Order.findAll({
    where: { clientId: ClientId },
    order: [['createdAt', 'DESC']],
  });
  const ordersList = orders.map((c) => c.dataValues);

  await event.reply(channels.ClientOrdersListReceive, ordersList);
}

module.exports = GetClientOrders;
