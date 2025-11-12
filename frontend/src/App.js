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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
          setIsMenuOpen(false);
        });
    } else {
      axios.post('http://localhost:5000/api/anime', formData)
        .then(() => {
          fetchAnime();
          setFormData({ title: '', status: '', rating: '', image: '' });
          setIsMenuOpen(false);
        });
    }
  };

  const handleEdit = anime => {
    setFormData(anime);
    setEditingId(anime._id);
    setIsMenuOpen(true);
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/anime/${id}`)
      .then(() => fetchAnime());
  };

  const filteredAnime = animeList.filter(anime =>
    anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    anime.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `url('https://wallpaperbat.com/img/43385258-anime-background-anime-background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: '#232526', // Fallback color while image loads
        minHeight: '100vh',
      }}
    >
      {/* Overlay for better readability */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for better content visibility
        }}
      />
      {/* Your Content/Components */}
      <div className="app-container relative z-10 p-6 mt-4">
        <h1 className="app-title text-center">Roshan Anime Shrine</h1>
        
        <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '↑ Close Menu' : '↓ Open Menu'}
        </button>

        <div className={`menu-content ${isMenuOpen ? 'open' : ''}`}>
          <input
            type="text"
            placeholder="Search anime..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="anime-form input mb-4"
            style={{ width: '100%', maxWidth: '400px' }}
          />

          <form className="anime-form" onSubmit={handleSubmit}>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            {editingId ? (
              <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="Completed">Completed</option>
                <option value="Watching">Watching</option>
                <option value="Dropped">Dropped</option>
              </select>
            ) : (
              <input name="status" value={formData.status} onChange={handleChange} placeholder="Status (Completed, Watching, Dropped)" required />
            )}
            <input name="rating" type="number" value={formData.rating} onChange={handleChange} placeholder="Rating (1-10)" required />
            <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
            <button type="submit">{editingId ? 'Update Anime' : 'Add Anime'}</button>
          </form>
        </div>

        <div className="anime-list">
          {filteredAnime.map(anime => (
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