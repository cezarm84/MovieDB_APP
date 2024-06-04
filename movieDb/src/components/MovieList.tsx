import { useStore } from '../store/store';
import MovieCard from '../components/MovieCard';
import './styles/movieList.css';

const MovieList: React.FC = () => {
  const movies = useStore((state) => state.movies);

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
