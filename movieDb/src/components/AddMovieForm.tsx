import React, { useState } from 'react';
import { useStore } from '../store/store';
import './styles/addMovieForm.css';

const AddMovieForm: React.FC = () => {
  const addMovie = useStore((state) => state.addMovie);
  const [title, setTitle] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUrl(posterUrl) || !validateUrl(trailerUrl)) {
      setError('Please enter valid URLs for the poster and trailer.');
      return;
    }
    setError('');
    addMovie({ title, posterUrl, trailerUrl });
    setTitle('');
    setPosterUrl('');
    setTrailerUrl('');
  };

  return (
    <div className="Model">
      <form onSubmit={handleSubmit} className="Model__Form add-movie-form">
        {error && <p className="error">{error}</p>}
        <div className="FormField">
          <label className="FormField__Label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="FormField__Input"
            placeholder="Title"
            required
            aria-label="Movie Title"
          />
        </div>
        <div className="FormField">
          <label className="FormField__Label">Poster URL</label>
          <input
            type="text"
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            className="FormField__Input"
            placeholder="Poster URL"
            required
            aria-label="Poster URL"
          />
        </div>
        <div className="FormField">
          <label className="FormField__Label">Trailer URL</label>
          <input
            type="text"
            value={trailerUrl}
            onChange={(e) => setTrailerUrl(e.target.value)}
            className="FormField__Input"
            placeholder="Trailer URL"
            required
            aria-label="Trailer URL"
          />
        </div>
        <button type="submit" className="FormField__Button">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
