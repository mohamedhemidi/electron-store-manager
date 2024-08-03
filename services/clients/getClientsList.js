const { models } = require('../../config/dbconfig');
const channels = require('../../constants/channels.json');

async function GetClientsList(event, args) {
  const clients = await models.Client.findAll();
  const clientsList = clients.map((c) => c.dataValues);

  await event.reply(channels.ClientsListReceive, clientsList);
}

module.exports = GetClientsList;
