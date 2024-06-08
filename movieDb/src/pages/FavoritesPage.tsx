import { useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { useStore } from '../store/store';
import Navbar from '../components/Navbar';
import { FaTrash } from 'react-icons/fa';
import './styles/favoritesPage.css';

const FavoritesPage = () => {
  const { movies, getMovies, toggleFavorite } = useStore();

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  useEffect(() => {
    document.body.classList.add('favorites-page-body');
    return () => {
      document.body.classList.remove('favorites-page-body');
    };
  }, []);

  const favoriteMovies = movies.filter((movie) => movie.is_favorite);

  const transitions = useTransition(favoriteMovies, {
    keys: (movie) => movie.imdbid,
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
  });

  return (
    <div className="favorites-page">
      <Navbar />
      <div className="fav-page">
        <div className="content">
          <h1 className="title">Favorite Movies</h1>
          <div className="fav-movie-list-wrapper">
            <ul className="fav-movie-list">
              {transitions((style, movie) => (
                <animated.li key={movie.imdbid} style={style} className="fav-movie-item">
                  <div className="fav-movie-info">
                    <img src={movie.poster} alt={movie.title} className="fav-movie-poster" />
                    <div className="fav-movie-details">
                      <h2>{movie.title}</h2>
                      <FaTrash onClick={() => toggleFavorite(movie.imdbid)} className="delete-icon" />
                    </div>
                  </div>
                </animated.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <video autoPlay loop muted className="video-background">
        <source src="/videos/Design1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
    </div>
  );
};

export default FavoritesPage;
