import { useEffect } from 'react';
import { useStore } from '../store/store'; 
import Navbar from '../components/Navbar';
import './styles/favoritesPage.css';

const FavoritesPage = () => {
  const { movies, getMovies, toggleFavorite } = useStore();

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const favoriteMovies = movies.filter(movie => movie.is_favorite);

  return (
    <div className="fav-page">
      <Navbar />
      <div className="content">
        <h1 className="title">Favorite Movies</h1>
        <ul className="movie-list">
          {favoriteMovies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <img src={movie.poster} alt={movie.title} className="movie-poster" />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <button onClick={() => toggleFavorite(movie.id)}>
                  {movie.is_favorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FavoritesPage;
