import { useParams } from 'react-router-dom';
import { useStore } from '../store/store';
import Navbar from '../components/Navbar';
import './styles/moviePage.css';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movie = useStore((state) => state.movies.find((movie) => movie.id === id));

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-details-page">
      <Navbar />
      <div className="movie-details">
        <h1>{movie.title}</h1>
        <img src={movie.posterUrl} alt={movie.title} />
        {movie.trailerUrl && (
          <iframe
            title="Movie Trailer"
            src={movie.trailerUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
