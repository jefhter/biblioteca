const db_sequelize = require('./config/db_sequelize');
const { Op } = require('sequelize');

const db_mongoose = require('./config/db_mongoose');
const mongoose = require('mongoose');
const Avaliacao = require('./models/Avaliacoes');

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const path = require('path');

const app = express();

// db_sequelize.sequelize.sync({ force: true }).then(() => {
//   console.log('{ force: true }');
// });

mongoose.connect(db_mongoose.connection)
  .then(() => console.log('Mongo conectado'))
  .catch((err) => console.log('>>>> ERRO: ', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

/*=========== ROTAS LIVRO ============*/

// create

app.get('/cadastrar-livro', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/pages/CadLivro.html'));
});

app.post('/livro/', (req, res) => { 
    (async () => {
        db_sequelize.Livro.create({
            titulo: req.body.titulo,
            autor: req.body.autor,
            tema: req.body.tema,
            emprestado: (req.body.emprestado.length == 2) ? req.body.emprestado[1] : req.body.emprestado
        });
        res.send('Livro cadastrado');
    })();
});

//update
app.get('/atualizar-livro', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/pages/AtualizaLivro.html'));
});

app.post('/atualizar-livro/', (req, res) => {
    (async () => {
        const livro = await db_sequelize.Livro.findByPk(req.body.livroId);
        livro.emprestado = (req.body.emprestado.length == 2) ? req.body.emprestado[1] : req.body.emprestado[0];
        await livro.save();
        res.send('Livro atualizado');
    })();
});

//search

app.get('/buscar-livro', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/pages/BuscaLivro.html'));
});

app.post('/buscar-livros', (req, res) => {
    (async () => {
        if (!req.body.livroId && !req.body.titulo){
            return res.send('Preencha um ID ou um Título para buscar por livros!');
        }
        if (req.body.livroId) {
            const livro = await db_sequelize.Livro.findByPk(parseInt(req.body.livroId));
            return res.json(livro);
        }
        else if (req.body.titulo) {
            const livros = await db_sequelize.Livro.findAll({
                where: { titulo: { [Op.iLike]: `%${req.body.titulo}%` } }
            });
            return res.json(livros);
        } 
    })();
});

//delete

app.get('/deletar-livro', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/pages/DeletaLivro.html'));
});

app.post('/deletar-livro', (req, res) => {
    (async () => {
        const livro = await db_sequelize.Livro.findByPk(parseInt(req.body.livroId));
        livro.destroy();
        res.send('Exclusao finalizada.');
    })();
});

/*============ ROTAS LEITOR ============*/

// create

app.get('/cadastrar-leitor', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/pages/CadLeitor.html'));
});

app.post('/leitor/', (req, res) => {
    (async () => {
        db_sequelize.Leitor.create({
            nome: req.body.nome
        });
        res.send('Leitor cadastrado(a)');
    })();
});

// update

app.get('/atualizar-leitor', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/pages/AtualizaLeitor.html'));
});

app.post('/atualizar-leitor/', (req, res) => {
    (async () => {
        const leitor = await db_sequelize.Leitor.findByPk(req.body.leitorId);
        leitor.nome = req.body.nome;
        await leitor.save();
        res.send('Leitor atualiado(a)');
    })();
});

// search

app.get('/buscar-leitor', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/pages/BuscaLeitor.html'));
});

app.post('/buscar-leitores', (req, res) => {
    (async () => {
        if (!req.body.leitorId && !req.body.nome){
            return res.send('Preencha um ID ou um Título para buscar por leitores!');
        }
        if (req.body.leitorId) {
            const leitor = await db_sequelize.Leitor.findByPk(parseInt(req.body.leitorId));
            return res.json(leitor);
        }
        else if (req.body.nome) {
            const leitores = await db_sequelize.Leitor.findAll({
                where: { nome: { [Op.iLike]: `%${req.body.nome}%` } }
            });
            return res.json(leitores);
        } 
    })();
});

// delete

app.get('/deletar-leitor/', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/pages/DeletaLeitor.html'));
});

app.post('/deletar-leitor', (req, res) => {
    (async () => {
        const livro = await db_sequelize.Leitor.findByPk(parseInt(req.body.leitorId));
        livro.destroy();
        res.send('Exclusao finalizada.');
    })();
});


/*================ ROTAS EMPRESTIMO ================*/

// create

app.get('/cadastrar-emprestimo', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/pages/CadEmprestimo.html'));
});

app.post('/emprestimo/', (req, res) => {
    db_sequelize.Emprestimo.create({
        livroId: req.body.livroId,
        leitorId: req.body.leitorId,
        dataEmprestimo: req.body.dataEmprestimo,
        dataDevolucao: req.body.dataDevolucao
    });
    res.send('Emprestimo cadastrado');
});

// update

app.get('/atualizar-emprestimo', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/pages/AtualizaEmprestimo.html'));
});

app.post('/atualizar-emprestimo/', (req, res) => {
    (async () => {
        const emprestimo = await db_sequelize.Emprestimo.findByPk(req.body.emprestimoId);
        emprestimo.dataDevolucao = req.body.dataDevolucao;
        const update = await emprestimo.save();
        res.json(update);
    })();
});

// search

app.get('/buscar-emprestimo', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/pages/BuscaEmprestimo.html'));
});

app.post('/buscar-emprestimos', (req, res) => {
    (async () => {
        if (!req.body.emprestimoId){
            const emprestimos = await db_sequelize.Emprestimo.findAll();
            return res.json(emprestimos);
        }
        else if (req.body.emprestimoId) {
            const emprestimo = await db_sequelize.Emprestimo.findByPk(parseInt(req.body.emprestimoId));
            return res.json(emprestimo);
        }
    })();
});

// delete

app.get('/deletar-emprestimo', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/pages/DeletaEmprestimo.html'));
});

app.post('/deletar-emprestimo', (req, res) => {
    (async () => {
        const livro = await db_sequelize.Emprestimo.findByPk(parseInt(req.body.emprestimoId));
        livro.destroy();
        res.send('Exclusao finalizada.');
    })();
});

/*================= ROTAS AVALIACOES =================*/

// create

app.get('/avalie', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/pages/CadAvaliacao.html'));
});

app.post('/avaliacao', (req, res) => {
    (async () => {
        new Avaliacao({
            livroId: req.body.livroId,
            avaliacoes:[{
                usuario: req.body.usuario,
                comentario: req.body.comentario,
                data: new Date()
            }]
        }).save().then(() => {
            return res.send('Obrigado por sua avaliação!');
        }).catch((err) => {
            console.log(err);
        });
    })();
});

// search
app.get('/ver-avaliacoes', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/pages/BuscaAvaliacao.html'));
});

app.post('/avaliacoes/', (req, res) => {
    (async () => {
        const avaliacao = await Avaliacao.find({
            livroId: req.body.livroId
        });
        return res.json(avaliacao);
    })();
});

// update
app.get('/atualizar-avaliacoes', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/pages/AtualizaAvaliacao.html'));
});

/* NAO ESTA FUNCIONANDO
app.post('/atualizar-avaliacao', (req, res) => {
    (async () => {
        const avaliacao = await Avaliacao.findOneAndUpdate({
            livroId: req.body.livroId,
            avaliacoes:[{
                _id: req.body.avaliacaoId,
                comentario: req.body.comentario,
                data: new Date()
            }]
        })
    })();
});
*/

// delete

app.get('/deletar-avaliacoes', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/pages/DeletaAvaliacao.html'));
});

/* NAO ESTA FUNCIONANDO
app.post('/deletar-avaliacao', (req, res) => {
    (async () => {
        const avaliacao = await Avaliacao.findOneAndDelete({
            _id: req.body.avaliacaoId,
            livroId: req.body.livroId,
        })
    })();
});
*/

/*================ ROTA CSS ================*/

app.get('/css', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/css/style.css'));
});

app.listen(8081, () => console.log(`Servidor rodando na porta 8081`));