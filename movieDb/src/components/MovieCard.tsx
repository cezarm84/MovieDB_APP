import { useStore } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../model/Movie';
import { FaTrash, FaHeart, FaRegHeart } from 'react-icons/fa'; 

interface MovieCardProps {
  movie: Movie;
  isActive: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { id, title, poster, is_favorite } = movie;
  const removeMovie = useStore((state) => state.removeMovie);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const navigate = useNavigate();

  return (
    <div className="movie-card">
      <img
        src={poster}
        alt={title}
        className="movie-poster"
        onClick={() => navigate(`/movie/${id}`)}
      />
      <div className="movie-info">
        <h3 onClick={() => navigate(`/movie/${id}`)}>{title}</h3>
        <div className="icon-buttons">
          <FaTrash onClick={() => removeMovie(id)} className="icon-button" />
          {is_favorite ? (
            <FaHeart onClick={() => toggleFavorite(id)} className="icon-button" />
          ) : (
            <FaRegHeart onClick={() => toggleFavorite(id)} className="icon-button" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

