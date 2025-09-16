const express = require('express');
const router = express.Router();
const Anime = require('../models/anime');

// 👉 GET all anime
router.get('/', async (req, res) => {
  try {
    const animeList = await Anime.find();
    res.json(animeList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 POST new anime
router.post('/', async (req, res) => {
  try {
    const { title, status, rating, image } = req.body;

    const newAnime = new Anime({ title, status, rating, image });
    const saved = await newAnime.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// 👉 PUT (update) anime by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, status, rating, image } = req.body;

    const updated = await Anime.findByIdAndUpdate(
      req.params.id,
      { title, status, rating, image },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// 👉 DELETE anime by ID
router.delete('/:id', async (req, res) => {
  try {
    await Anime.findByIdAndDelete(req.params.id);
    res.json({ message: 'Anime deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
