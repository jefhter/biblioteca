const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Emprestimo = sequelize.define('emprestimo', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    livroId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    leitorId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    dataEmprestimo: {
      type: Sequelize.DATE,
      allowNull: false
    },
    dataDevolucao: {
      type: Sequelize.DATE,
      allowNull: true
    }
  })

  return Emprestimo;
} 