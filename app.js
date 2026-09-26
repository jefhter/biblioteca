const db_mongoose = require('./config/db_mongoose');
const mongoose = require('mongoose');
const Livro = require('./models/Livro');

mongoose.connect(db_mongoose.connection).then(() => {
  console.log('conectado');
}).catch((err) => {
  console.log('>>>> ERRO: ', err);
});