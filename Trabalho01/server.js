const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario', // Substitua pelo seu usuário do MySQL
  password: 'sua_senha', // Substitua pela sua senha do MySQL
  database: 'my_web_app' // Nome do banco de dados
});

db.connect(err => {
  if (err) throw err;
  console.log('Banco de dados conectado!');
});

// Rota vulnerável a SQL Injection no Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  
  db.query(query, (err, result) => {
    if (err) throw err;
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
    if (err) throw err;
    res.json(result);
  });
});

// Rota vulnerável a SQL Injection para adicionar um novo usuário
app.post('/addUser', (req, res) => {
  const { username, password } = req.body;
  const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
  
  db.query(query, (err, result) => {
    if (err) throw err;
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

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
