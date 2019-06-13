const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = new multer(uploadConfig);

// Define a rota de listagem de Posts
routes.get('/posts', PostController.index);

// Define a rota de inclusão de um novo Post
routes.post('/posts', upload.single('image'), PostController.store);

// Define a rota de incremento de like
// em um determinado Post (:id)
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;