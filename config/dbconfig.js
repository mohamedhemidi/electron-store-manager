const path = require('path');
const {DataTypes, Sequelize} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/main.sqlite'),
});

const Order = sequelize.define('orders', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Automatically generate a UUIDV4
    primaryKey: true,
    allowNull: false
  },
  client_Id: {
    type: DataTypes.UUIDV4,
    allowNull: true,
  },
  client_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
const Client = sequelize.define('clients', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Automatically generate a UUIDV4
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Client.hasMany(Order);
Order.belongsTo(Client);

async function initializeDatabase() {
  await sequelize.sync();
}

module.exports = {
  initializeDatabase,
  models: {
    Order,
    Client,
  },
};
