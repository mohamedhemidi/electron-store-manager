const Client = require('./Client');
const Order = require('./Order');

Client.hasMany(Order);
Order.belongsTo(Client);

module.exports = {
  Client,
  Order,
};
