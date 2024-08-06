const { models } = require('../../config/dbconfig');
async function UpdateOrder(data) {
  try {
    const [updatedRows] = await models.Order.update(
      {
        weight: data.order.weight,
        price: data.order.price,
        color: data.order.color,
        dueDate: data.order.dueDate,
        type: data.order.type,
        notes: data.order.notes,
        client_name: data.order.client_name,
        clientId: data.order.clientId,
      },
      {
        where: {
          id: data.orderId,
        },
      }
    );
    if (updatedRows > 0) {
      console.log(`Successfully updated ${updatedRows} order(s).`);
    } else {
      console.log('No client found with the specified ID.');
    }
  } catch (error) {
    console.error('Error updating client:', error);
  }
}

module.exports = UpdateOrder;
