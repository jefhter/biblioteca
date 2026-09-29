const db_mongoose = require('./config/db_mongoose');
const db_sequelize = require('./config/db_sequelize');
const mongoose = require('mongoose');
const Livro = require('./models/Livro');

const express = require('express');
const path = require('path');

const app = express();

db_sequelize.sequelize.sync({ force: true }).then(() => {
  console.log('{ force: true }');
});

// mongoose.connect(db_mongoose.connection)
//   .then(() => console.log('Mongo conectado'))
//   .catch((err) => console.log('>>>> ERRO: ', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

/*===========

 ROTAS LIVRO

============*/

app.get('/livro', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/livro.html'));
});

// create
app.post('/livro/', (req, res) => { 
    (async () => {
        db_sequelize.Livro.create({
            titulo: req.body.titulo,
            autor: req.body.autor,
            tema: req.body.tema,
            emprestado: (req.body.emprestado.length == 2) ? req.body.emprestado[1] : req.body.emprestado
        });
        res.send('Livro cadastrada');
    })();
});

//update
app.put('/livro/:id/:emprestado', (req, res) => {
    (async () => {
        const livro = await db_sequelize.Livro.findByPk(req.params.id);
        livro.emprestado = req.params.emprestado;
        const update = await livro.save();
        console.log(update);
    })();
});

//search
app.get('/livro/:id', (req, res) => {
    (async () => {
        const livro = db_sequelize.Livro.findByPk(req.params.id);
        res.json(livro);
    })();
});

//delete
app.delete('/livro/:id', (req, res) => {
    (async () => {
        const livro = await db_sequelize.Livro.findByPk(req.params.id);
        livro.destroy();
    })();
});

/*============

 ROTAS LEITOR

============*/

app.get('/leitor', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/leitor.html'));
});

// create
app.post('/leitor/', (req, res) => {
    (async () => {
        db_sequelize.Leitor.create({
            nome: req.body.nome
        });
        res.send('Livro cadastrada');
    })();
});

// update
app.put('/leitor/:id/:nome', (req, res) => {
    (async () => {
        const leitor = await db_sequelize.Leitor.findByPk(req.params.id);
        leitor.nome = req.params.nome;
        const update = await leitor.save();
        console.log(update);
    })();
});

// search
app.get('/leitor/:id', (req, res) => {
    (async () => {
        const leitor = db_sequelize.Leitor.findByPk(req.params.id);
        res.json(leitor);
    })();
});

// delete
app.delete('/leitor/:id', (req, res) => {
    (async () => {
        const leitor = await db_sequelize.Leitor.findByPk(req.params.id);
        leitor.destroy();
    })();
});


/*================

 ROTAS EMPRESTIMO

================*/

app.get('/emprestimo', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/emprestimo.html'));
});

// create
app.post('/emprestimo/', (req, res) => {
    db_sequelize.Emprestimo.create({
        livroId: req.body.livroId,
        leitorId: req.body.leitorId,
        dataEmprestimo: req.body.dataEmprestimo,
        dataDevolucao: req.body.dataDevolucao
    });
    res.send('Livro cadastrada');
});

// update
app.put('/emprestimo/:id/:dataDevolucao', (req, res) => {
    (async () => {
        const emprestimo = await db_sequelize.Emprestimo.findByPk(req.params.id);
        emprestimo.dataDevolucao = req.params.dataDevolucao;
        const update = await emprestimo.save();
        res.json(update);
    })();
});

// search
app.get('/emprestimo/:id', (req, res) => {
    (async () => {
        const emprestimo = db_sequelize.Emprestimo.findByPk(req.params.id);
        res.json(emprestimo);
    })();
});

// delete
app.delete('/emprestimo/:id', (req, res) => {
    (async () => {
        const emprestimo = await db_sequelize.Emprestimo.findByPk(req.params.id);
        emprestimo.destroy();
    })();
});

/*=================

 ROTAS AVALIACOES

=================*/

// app.get('/avaliacoes', (req, res) => {
//   res.sendFile(path.join(__dirname, '/pages/avaliacoes.html'));
// });

// // create
// app.post('/avaliacoes/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/pages/avaliacoes.html'));
// });

// // update
// app.put('/avaliacoes::', (req, res) => {
//   res.sendFile(path.join(__dirname, '/pages/avaliacoes.html'));
// });

// // search
// app.get('/avaliacoes/:id', (req, res) => {
//     if(req.params.id == null){
//         (async () => {
//             const avaliacoes = db_sequelize.Avaliacao.findAll();
//             res.json(avaliacoes);
//         })();
//     } else{
//         (async () => {
//             const avaliacao = db_sequelize.Avaliacao.findByPk(req.params.id);
//             res.json(avaliacao);
//         })();
//     }
// });

// // delete
// app.delete('/avaliacoes=', (req, res) => {
//   res.sendFile(path.join(__dirname, '/pages/avaliacoes.html'));
// });

app.listen(8081, () => console.log(`Servidor rodando na porta 8081`));