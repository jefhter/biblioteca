const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Leitor = sequelize.define('leitor', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  })

  return Leitor;
}