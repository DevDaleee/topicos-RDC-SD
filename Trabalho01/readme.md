# My Web App

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

## Vulnerabilidades

### SQL Injection

1. **Login (/login)**:
   - O endpoint de login permite SQL Injection, pois as entradas do `username` e `password` são concatenadas diretamente na consulta SQL sem validação ou uso de parâmetros preparados.
   
2. **Pesquisa de Usuário (/search)**:
   - O endpoint de pesquisa de usuário também é vulnerável a SQL Injection, permitindo que um atacante manipule a consulta inserindo caracteres especiais no campo `username`.

3. **Adicionar Usuário (/addUser)**:
   - A rota que adiciona um novo usuário não valida corretamente os campos inseridos, tornando-a vulnerável a SQL Injection.

### XSS

1. **Comentários (/comment)**:
   - O formulário de comentários exibe o conteúdo inserido pelo usuário diretamente na página sem escapar ou sanitizar o conteúdo, permitindo ataques de Cross-Site Scripting (XSS).

2. **Exibição de Comentários (/comments)**:
   - Quando os comentários são carregados, eles são renderizados diretamente no DOM do navegador, permitindo que scripts maliciosos sejam executados.

## Aviso

Este aplicativo contém vulnerabilidades intencionalmente para fins educacionais. Não use em produção.
