const { models } = require('../../config/dbconfig');
async function DeleteClient(id) {
  try {
    const [updatedRows] = await models.Client.destroy({
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

module.exports = DeleteClient;
