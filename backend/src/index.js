const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dbCredentials = require('./config/mongoose.json');
const app = express();

mongoose.connect(
    `mongodb+srv://${dbCredentials.user}:${dbCredentials.password}@cluster0-6bi6g.mongodb.net/test?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
    }
);

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

app.listen(3333);

