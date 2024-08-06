const { models } = require('../../config/dbconfig');
const { v4: uuidv4 } = require('uuid');
async function CreateOrder(data) {
  let newOrder = {
    id: uuidv4(),
    weight: data.weight,
    price: data.price,
    color: data.color,
    dueDate: data.dueDate,
    type: data.type,
    notes: data.notes,
    client_name: data.client_name,
    clientId: data.clientId,
  };
  const order = await models.Order.create(newOrder);
  return order;
}

module.exports = CreateOrder;
