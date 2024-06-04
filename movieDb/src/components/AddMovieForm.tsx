import React, { useState } from 'react';
import { useStore } from '../store/store';
import './styles/addMovieForm.css';

const AddMovieForm: React.FC = () => {
  const addMovie = useStore((state) => state.addMovie);
  const [title, setTitle] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMovie({ title, posterUrl, trailerUrl });
    setTitle('');
    setPosterUrl('');
    setTrailerUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={posterUrl}
        onChange={(e) => setPosterUrl(e.target.value)}
        placeholder="Poster URL"
        required
      />
      <input
        type="text"
        value={trailerUrl}
        onChange={(e) => setTrailerUrl(e.target.value)}
        placeholder="Trailer URL"
        required
      />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;
