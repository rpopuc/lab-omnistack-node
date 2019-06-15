const Post = require('../models/Post');

module.exports = {

  // Método para incrementar os likes
  // de um post
  async store(req, res) {
    // Obtém o post da base de dados
    // a partir de seu identificador
    const post = await Post.findById(req.params.id);

    // Incrementa a quantidade de likes
    post.likes += 1;

    // Salva o post na base de dados
    await post.save();

    // Envia a notificação de modificação dos
    // likes do post
    req.io.emit('like', post);

    // Retorna os dados do post
    // via json
    return res.json(post);
  },
};
