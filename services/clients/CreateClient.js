const { models } = require('../../config/dbconfig');
const { v4: uuidv4 } = require('uuid');
async function CreateClient(name) {
  let data = {
    id: uuidv4(),
    name: name,
  };
  const client = await models.Client.create(data);
  return client;
}

module.exports = CreateClient;
