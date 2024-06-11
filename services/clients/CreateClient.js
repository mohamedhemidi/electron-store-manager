const { models } = require('../../config/dbconfig');
const { v4: uuidv4 } = require('uuid');
async function createClient(clientData) {
  let data = {
    id: uuidv4(),
    name: clientData,
  };
  const client = await models.Client.create(data);
  return client;
}

module.exports = createClient;
