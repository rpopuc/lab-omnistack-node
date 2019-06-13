const mongoose = require('mongoose');

// Define o esquema de dados
// para gravação de Post
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtag: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);