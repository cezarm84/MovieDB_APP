import { useStore } from '../store/store';
import './styles/movieList.css';
import { useEffect } from 'react';
const MovieList = () => {
  const { movies, getMovies } = useStore();

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
