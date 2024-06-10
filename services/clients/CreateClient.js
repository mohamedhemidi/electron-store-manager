const { models } = require('../../config/dbconfig');

async function createClient(clientData) {
  const client = await models.Client.create(clientData);
  return client;
}

module.exports = createClient;
