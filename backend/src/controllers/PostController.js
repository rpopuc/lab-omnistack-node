const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {

  // Método para listagem de todos os posts
  // armazenados na base de dados
  async index(req, res) {
    // Obtém os posts em ordem decrescente de inclusão
    const posts = await Post.find().sort('-createdAt');

    // Retorna a lista de posts, em formato json
    return res.json(posts);
  },

  // Método para armazenamento de um novo post
  // na base de dados
  async store(req, res) {
    // Monta variáveis a partir dos dados de requisição
    const {
      author, place, description, hashtags,
    } = req.body;

    // Obtém o nome do arquivo a partir da requisição
    const { filename: image } = req.file;

    // Obtém o nome do arquivo sem a extensão
    const [name] = image.split('.');

    // Constrói o nome do arquivo com a extensão jpg
    const fileName = `${name}.jpg`;

    // Redimensiona a imagem
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName),
      );

    // Exclui arquivo original da pasta uploads
    fs.unlinkSync(req.file.path);

    // Armazena o post na base de dados
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
    });

    // Emite a atualização do post
    req.io.emit('post', post);

    // Retorna os dados do post no formato json
    return res.json(post);
  },
};
