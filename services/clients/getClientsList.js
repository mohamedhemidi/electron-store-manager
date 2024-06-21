const { models } = require('../../config/dbconfig');

async function GetClientsList(event, args) {
  //console.log('Parameteres received from renderer:', args);

  const clients = await models.Client.findAll();
  const clientsList = clients.map(c => c.dataValues);

  await event.reply('client:list:response', clientsList);
}

module.exports = GetClientsList;
