const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');

// Carregar variáveis do arquivo .env
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root', //Atualiza com teu usuário do MySQL
  password: process.env.DB_PASSWORD || 'NovaSenha123',  //Atualiza com tua senha do MySQL
  database: process.env.DB_NAME || 'my_web_app',
  port: process.env.DB_PORT || 3306  //Atualiza com tua porta do MySQL, se não tiver configure
});

// Conectar ao banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Banco de dados conectado!');
});

// Rota vulnerável a SQL Injection no Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).send('Erro no servidor');
    }
    if (result.length > 0) {
      res.send('Login bem-sucedido!');
    } else {
      res.send('Usuário ou senha inválidos!');
    }
  });
});

// Rota vulnerável a SQL Injection para pesquisa de usuários
app.get('/search', (req, res) => {
  const { username } = req.query;
  const query = `SELECT * FROM users WHERE username = '${username}'`;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).send('Erro no servidor');
    }
    res.json(result);
  });
});

// Rota vulnerável a SQL Injection para adicionar um novo usuário
app.post('/addUser', (req, res) => {
  const { username, password } = req.body;
  const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao adicionar o usuário:', err);
      return res.status(500).send('Erro no servidor');
    }
    res.send('Usuário adicionado com sucesso!');
  });
});

// Armazenar comentários
let comments = [];

// Rota para adicionar comentários
app.post('/comment', (req, res) => {
  const { comment } = req.body;
  comments.push(comment);
  res.redirect('/'); 
});

// Rota para exibir comentários
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Rota para servir a página inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
