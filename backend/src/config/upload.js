const multer = require('multer');
const path = require('path');

module.exports = {
  // Configura o armazenamento dos arquivos
  // enviados via requisição http
  storage: multer.diskStorage({
    // Configura a pasta de armazenamento
    destination: path.resolve(__dirname, '..', '..', 'uploads'),

    // Obtém o nome de armazenamento do arquivo
    filename(req, file, callback) {
      callback(null, file.originalname);
    },
  }),
};
