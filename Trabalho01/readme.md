# Aprendendo a identificar SQL Injection e XSS

Este é um aplicativo web com vulnerabilidades de SQL Injection e XSS, projetado para fins educacionais.

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [MySQL](https://www.mysql.com/) instalado

## Configuração do Banco de Dados

1. Abra o terminal do MySQL:
   ```bash
   mysql -u seu_usuario -p
   ```
   
2. Crie o banco de dados:
   ```sql
   CREATE DATABASE my_web_app;
   USE my_web_app;
   ```

3. Crie a tabela `users`:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(50) NOT NULL,
       password VARCHAR(255) NOT NULL
   );
   ```

4. Insira um usuário de exemplo:
   ```sql
   INSERT INTO users (username, password) VALUES ('admin', 'admin123');
   ```

## Como Executar

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu_usuario/my-web-app.git
   cd my-web-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```

4. Acesse o aplicativo em `http://localhost:3000`.

## Aviso

Este aplicativo contém vulnerabilidades intencionalmente para fins educacionais. Não use em produção.
