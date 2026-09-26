const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');

const avaliacoes = mongoose.Schema({
  livroId: { type: INTEGER, required: true },
  avaliacoes: [{
    usuario:{ type: String, required: true },
    comentario:{ type: String, required: true },
    indicacao: { type: String, required: true },
    data: { type: String, required: true }
  }]
});

module.exports = mongoose.model("Atualizacoes", avaliacoes);