import React, { useState } from 'react';
import { Movie } from '../model/Movie';
import MovieCard from './MovieCard';
import './styles/movieList.css'; 

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="movie-list-container">
      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} isActive={index === currentIndex} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
