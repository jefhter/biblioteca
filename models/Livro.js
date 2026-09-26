const Sequelize = require('sequelize');
const db = require('./db_sequelize');

const Livro = db.define('livro', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  titulo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  autor: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  tema: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  emprestado: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

module.exports = Livro;