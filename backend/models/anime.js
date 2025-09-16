const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Watching', 'Completed', 'Plan to Watch'],
    required: true,
  },
  image: {
    type: String, // 🖼️ NEW field for image URLs
    required: true
  }
});

module.exports = mongoose.model('Anime', animeSchema);
