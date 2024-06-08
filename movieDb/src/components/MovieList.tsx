import React, { useState } from 'react';
import { Movie } from '../model/Movie';
import MovieCard from './MovieCard';
import './styles/movieList.css'; 

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [currentIndex] = useState(0);

 
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
