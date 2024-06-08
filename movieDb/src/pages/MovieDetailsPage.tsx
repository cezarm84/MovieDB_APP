import { useParams } from 'react-router-dom';
import { Movie } from '../model/Movie';
import { useStore } from '../store/store';
import './styles/movieDetailsPage.css';
import Navbar from '../components/Navbar';

const MovieDetailsPage: React.FC = () => {
  const { imdbid } = useParams<{ imdbid: string }>();
  const movies = useStore((state) => state.movies);
  const movie = movies.find((movie: Movie) => movie.imdbid === imdbid);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <Navbar />
      <div className="content">
        <div className="trailer-content">
          <h2>{movie.title}</h2>
          {movie.trailer_link && (
            <iframe
              width="100%"
              height="315"
              src={movie.trailer_link}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default MovieDetailsPage;


