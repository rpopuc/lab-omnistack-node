const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dbCredentials = require('./config/mongoose.json');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

// Configura conexão com a base de dados MongoDB
mongoose.connect(
    `mongodb+srv://${dbCredentials.user}:${dbCredentials.password}@cluster0-6bi6g.mongodb.net/test?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
    }
);

// Disponibiliza io para todos os middlewares
app.use((req, res, next) => {
    // Define a variável para acesso futuro
    req.io = io;

    // Mantém a execução da cadeia
    // de middlewares
    next();
});

// Disponibiliza o conteúdo da pasta ../uploads/resized
// através da rota /files
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// Utiliza CORS
app.use(cors());

// Configura as rotas da aplicação
app.use(require('./routes'));

// Inicia o protocolo http na porta 3333
server.listen(3333);
