const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'web2_db',
  'postgres',
  '1234',
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

module.exports = sequelize;