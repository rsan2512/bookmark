import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    rating: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAnime();
  }, []);

  const fetchAnime = () => {
    axios.get('http://localhost:5000/api/anime')
      .then(response => setAnimeList(response.data))
      .catch(error => console.error('Fetch failed:', error));
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://localhost:5000/api/anime/${editingId}`, formData)
        .then(() => {
          fetchAnime();
          setFormData({ title: '', status: '', rating: '', image: '' });
          setEditingId(null);
        });
    } else {
      axios.post('http://localhost:5000/api/anime', formData)
        .then(() => {
          fetchAnime();
          setFormData({ title: '', status: '', rating: '', image: '' });
        });
    }
  };

  const handleEdit = anime => {
    setFormData(anime);
    setEditingId(anime._id);
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/anime/${id}`)
      .then(() => fetchAnime());
  };

  return (
    <div className="min-h-screen w-full bg-[#f9fafb] relative">
      {/* Diagonal Fade Grid Background - Top Left */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d1d5db 1px, transparent 1px),
            linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
        }}
      />
      {/* Your Content/Components */}
      <div className="app-container relative z-10">
        <h1> Roshan Anime Shrine</h1>

        <form className="anime-form" onSubmit={handleSubmit}>
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
          <input name="status" value={formData.status} onChange={handleChange} placeholder="Status (Completed, Watching, Dropped)" required />
          <input name="rating" type="number" value={formData.rating} onChange={handleChange} placeholder="Rating (1-10)" required />
          <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
          <button type="submit">{editingId ? 'Update Anime' : 'Add Anime'}</button>
        </form>

        <div className="anime-list">
          {animeList.map(anime => (
            <div key={anime._id} className="anime-card">
              <img src={anime.image} alt={anime.title} className="anime-img" />
              <h2>{anime.title}</h2>
              <p>Status: {anime.status}</p>
              <p>Rating: ⭐ {anime.rating}</p>
              <button onClick={() => handleEdit(anime)}>Edit</button>
              <button onClick={() => handleDelete(anime._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
