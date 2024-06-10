const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../db/database.sqlite'),
});
exports.sequelize = sequelize;

const models = require('../models');

async function initializeDatabase() {
  await sequelize.sync();
}

module.exports = {
  initializeDatabase,
};
