import React, { useState } from 'react';
import { Movie } from '../model/Movie';
import  MovieCard  from './MovieCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
          <div key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <div className="arrow" onClick={goToPrevious}><FaArrowLeft /></div>
        <div className="arrow" onClick={goToNext}><FaArrowRight /></div>
      </div>
    </div>
  );
};

export default MovieList;
