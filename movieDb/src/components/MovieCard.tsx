import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../model/Movie';
import { useStore } from '../store/store';
import { FaTrash, FaHeart, FaRegHeart } from 'react-icons/fa';
import './styles/movieCard.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { imdbid, title, poster, is_favorite } = movie;
  const removeMovie = useStore((state) => state.removeMovie);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movie/${imdbid}`);
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="movie-card" onClick={handleMovieClick}>
      <img
        src={poster}
        alt={title}
        className="movie-poster"
      />
      <div className="icon-buttons" onClick={handleIconClick}>
        <FaTrash onClick={() => removeMovie(imdbid)} className="icon-button" />
        {is_favorite ? (
          <FaHeart onClick={() => toggleFavorite(imdbid)} className="icon-button" />
        ) : (
          <FaRegHeart onClick={() => toggleFavorite(imdbid)} className="icon-button" />
        )}
      </div>
      <div className="movie-title">{title}</div>
    </div>
  );
};

export default MovieCard;
