const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dbCredentials = require('./config/mongoose.json');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
    `mongodb+srv://${dbCredentials.user}:${dbCredentials.password}@cluster0-6bi6g.mongodb.net/test?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
    }
);

// Disponibiliza io para todos os middlewares
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// Utiliza CORS
app.use(cors());

// Configura as rotas da aplicação
app.use(require('./routes'));

// Inicia o protocolo http na porta 3333
server.listen(3333);
