# 📚 Sistema Biblioteca

Sistema de gerenciamento de biblioteca desenvolvido como projeto da disciplina de **Programação Web Back-End**, utilizando uma arquitetura híbrida de bancos de dados: **PostgreSQL** (dados relacionais e transacionais) e **MongoDB** (dados semiestruturados e flexíveis).

---

## 👤 Autoria

- **Autor:** Jefhter Cabral
- **Professora:** Tatianne Costa Negri Rocha
- **Disciplina:** Programação Web Back-End

---

## 🗂️ Estrutura do Projeto

```
📁 config
   📄 db_mongo.js       # Configuração de conexão com o MongoDB
   📄 db_postgres.js    # Configuração de conexão com o PostgreSQL
📁 logs
   📄 erros.log         # Registro de erros da aplicação
📁 models                # Modelos (schemas/entidades) do sistema
📁 node_modules
📁 pages                 # Rotas / páginas da aplicação
📄 app.js                # Ponto de entrada da aplicação
📄 package-lock.json
📄 package.json
📄 README.md
```

---

## 🗃️ Modelagem de Dados

### PostgreSQL — Dados Relacionais

**Entidades:** Bibliotecário, Leitor, Livro, Empréstimo

| Entidade | Atributos |
|---|---|
| **Leitor** | `leitorId`, `leitorNome`, `livroId`, `emprestimoId` |
| **Livro** | `ID`, `Título`, `Autor`, `Tema`, `Situação`, `Data de Empréstimo` (obrigatório se `Situação` = "emprestado") |
| **Empréstimo** | `emprestimoId`, `leitorId`, `livroId` |

**Relacionamentos:**

```
 Leitor
    │
    │  1:N
    │
    ▼
  Empréstimo
    │
    │  N:N
    │
    ▼
 Livro
```

- Um **Leitor** pode realizar vários **Empréstimos** (1:N).
- Um **Livro** pode estar associado a vários **Empréstimos** ao longo do tempo (N:1 em relação ao histórico).
- Cada **Empréstimo** está vinculado a um **Bibliotecário** responsável pelo registro.

### MongoDB — Dados Semiestruturados

**Coleção:** `avaliacoes`

Armazena as avaliações e comentários dos leitores sobre os livros, em um formato flexível de documento:

```json
{
  "livroId": 15,
  "avaliacoes": [
    {
      "usuario": "Filipe",
      "comentario": "Excelente livro!",
      "indicacao": "Senti falta de um cafezinho aqui na Biblioteca",
      "data": "21/03/2026"
    },
    {
      "usuario": "Antonio Marcos",
      "comentario": "Gostei do livro",
      "indicacao": "Gostaria de indicar o livro 'O Custo do Discipulado' de Jonas Madureira, para a Biblioteca.",
      "data": "01/01/2026"
    }
  ]
}
```

---

## 💡 Justificativa: Por que PostgreSQL e por que MongoDB?

A escolha de um modelo híbrido de persistência partiu das características de cada tipo de dado tratado pelo sistema:

### Por que PostgreSQL para Bibliotecário, Leitor, Livro e Empréstimo?

- Esses dados possuem **estrutura fixa e bem definida**, com relacionamentos claros e obrigatórios entre as entidades (Leitor → Empréstimo → Livro → Bibliotecário).
- Há necessidade de **integridade referencial** (um empréstimo sempre precisa existir de um leitor e um livro válidos) e de **regras de negócio rígidas**, como a obrigatoriedade da data de empréstimo quando a situação do livro é "emprestado".
- Operações como controle de empréstimos exigem **consistência transacional (ACID)** — não é aceitável que um empréstimo fique registrado sem o respectivo livro ou leitor, por exemplo.
- Um banco relacional facilita consultas com **JOINs** entre as entidades, como listar empréstimos com nome do bibliotecário, do leitor e do livro simultaneamente.

### Por que MongoDB para Avaliações?

- As avaliações têm uma estrutura **variável e não obrigatória**: cada avaliação pode ter comentário, indicação, ambos, ou nenhum dos dois, sem necessidade de um schema rígido.
- Um mesmo livro pode acumular **um número indeterminado de avaliações**, o que se encaixa naturalmente no modelo de **documento com array embutido**, evitando múltiplos JOINs.
- Não há relacionamento crítico de integridade entre avaliações e o restante do sistema — é um dado mais próximo de "conteúdo gerado pelo usuário", cenário no qual bancos NoSQL orientados a documentos costumam ser mais performáticos e flexíveis.
- Essa separação também reduz a carga sobre o banco relacional, mantendo o PostgreSQL focado nos dados **estruturais e transacionais** do sistema.

---

## 🔧 CRUD

O sistema implementa as operações de CRUD para todas as entidades do PostgreSQL:

### CREATE — cadastrar registros
```js
Livro.create(...);
Bibliotecario.create(...);
Leitor.create(...);
Emprestimo.create(...);
```

### READ — consultar registros
```js
Livro.findAll(...);
Bibliotecario.findAll(...);
Leitor.findAll(...);
Emprestimo.findAll(...);
```

### UPDATE — atualizar registros
```js
Livro.update(...);
Bibliotecario.update(...);
Leitor.update(...);
Emprestimo.update(...);
```

### DELETE — excluir registros
```js
Livro.destroy(...);
Bibliotecario.destroy(...);
Leitor.destroy(...);
Emprestimo.destroy(...);
```

---

## 🔎 Consultas Disponíveis

- **Listar livros:** todos, id, título, autor, situação, tema
- **Listar leitores:** nome e id
- **Listar bibliotecários:** nome e id
- **Listar empréstimos:** data, nome do bibliotecário, nome do leitor, nome do livro
- **Avaliações do livro:** nome e id (consulta ao MongoDB)

---

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Configurar as conexões em /config (db_postgres.js e db_mongo.js)

# Iniciar a aplicação
node app.js
```

---

## 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais na disciplina de Programação Web Back-End.