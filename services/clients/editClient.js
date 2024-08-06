const { models } = require('../../config/dbconfig');
async function UpdateClient(data) {
  try {
    const [updatedRows] = await models.Client.update(
      {
        name: data.newName,
      },
      {
        where: {
          id: data.clientId,
        },
      }
    );
    if (updatedRows > 0) {
      console.log(`Successfully updated ${updatedRows} client(s).`);
    } else {
      console.log('No client found with the specified ID.');
    }
  } catch (error) {
    console.error('Error updating client:', error);
  }
}

module.exports = UpdateClient;
