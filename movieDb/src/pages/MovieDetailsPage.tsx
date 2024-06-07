import { useParams } from 'react-router-dom';
import { Movie } from '../store/store';
import { useStore } from '../store/store';
import './styles/movieDetailsPage.css';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movies = useStore((state) => state.movies);
  const movie = movies.find((movie: Movie) => movie.id === id);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <img src={movie.posterUrl} alt={movie.title} />
      <iframe
        width="560"
        height="315"
        src={movie.trailerUrl}
        title="Movie Trailer"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieDetailsPage;
