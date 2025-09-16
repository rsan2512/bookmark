const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // load .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
const animeRoutes = require('./routes/animeRoutes');
app.use('/api/anime', animeRoutes);


// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔥 MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB Error:', err));

// Sample route
app.get('/', (req, res) => {
  res.send('Yo Roshan-sama, your backend is live! 💻🔥');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
