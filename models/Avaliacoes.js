const mongoose = require('mongoose');

const avaliacoesSchema = new mongoose.Schema({
  livroId: { type: Number, required: true },
  avaliacoes: [{
    usuario: { type: String, required: true },
    comentario: { type: String, required: true },
    data: { type: String, required: true }
  }]
});

module.exports = mongoose.model('Avaliacao', avaliacoesSchema);