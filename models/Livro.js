const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Livro = sequelize.define('livro', {
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

  return Livro;
}