import React from 'react';
import { Movie } from '../store/store';
import MovieCard from './MovieCard';
import './styles/movieList.css';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterUrl={movie.posterUrl}
          isFavorite={movie.isFavorite}
        />
      ))}
    </div>
  );
};

export default MovieList;
