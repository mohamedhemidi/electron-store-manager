const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbconfig');
const Client = require('./Client');

const Order = sequelize.define('orders', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },

  weight: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  client_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  clientId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: Client,
      key: 'id',
    },
  },
});

module.exports = Order;
