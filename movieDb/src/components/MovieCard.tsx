import { useStore } from '../store/store';
import { useNavigate } from 'react-router-dom';
import './styles/movieCard.css';

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
  isFavorite: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterUrl, isFavorite }) => {
  const removeMovie = useStore((state) => state.removeMovie);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const navigate = useNavigate();

  return (
    <div className="movie-card">
      <img
        src={posterUrl}
        alt={title}
        className="movie-poster"
        onClick={() => navigate(`/movie/${id}`)}
      />
      <div className="movie-info">
        <h3 onClick={() => navigate(`/movie/${id}`)}>{title}</h3>
        <button onClick={() => toggleFavorite(id)}>
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </button>
        <button onClick={() => removeMovie(id)}>Remove</button>
      </div>
    </div>
  );
};

export default MovieCard;
