const { models } = require('../../config/dbconfig');
async function DeleteOrder(id) {
  try {
    const [deletedRows] = await models.Order.destroy({
      where: {
        id: id,
      },
    });
    if (deletedRows > 0) {
      console.log(`Successfully deleted ${deletedRows} client(s).`);
    } else {
      console.log('No client found with the specified ID.');
    }
  } catch (error) {
    console.error('Error updating client:', error);
  }
}

module.exports = DeleteOrder;
