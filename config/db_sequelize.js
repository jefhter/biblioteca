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

const db_sequelize = {}

db_sequelize.Sequelize = Sequelize;
db_sequelize.sequelize = sequelize;

db_sequelize.Leitor = require('../models/Leitor.js')(sequelize, Sequelize);
db_sequelize.Emprestimo = require('../models/Emprestimo.js')(sequelize, Sequelize);
db_sequelize.Livro = require('../models/Livro.js')(sequelize, Sequelize);

db_sequelize.Leitor.hasMany(db_sequelize.Emprestimo);
db_sequelize.Emprestimo.belongsTo(db_sequelize.Leitor);

db_sequelize.Emprestimo.belongsToMany(
  db_sequelize.Livro,
  {through: 'livroEmprestado'} 
)

db_sequelize.Livro.belongsToMany(
  db_sequelize.Emprestimo,
  {through: 'livroEmprestado'} 
)

module.exports = db_sequelize;