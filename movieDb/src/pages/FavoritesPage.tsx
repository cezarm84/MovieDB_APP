import { useEffect } from 'react';
import { useStore } from '../store/store'; 
import Navbar from '../components/Navbar';
import './styles/favoritesPage.css';

const FavoritesPage = () => {
  const { movies, getMovies, toggleFavorite } = useStore();

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const favoriteMovies = movies.filter(movie => movie.isFavorite);

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
  };

  return (
<<<<<<< HEAD
    <div className="fav-page">
      <Navbar />
      <div className="content">
        <h1 className="title">Favorite Movies</h1>
        <ul className="movie-list">
          {favoriteMovies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <button onClick={() => handleToggleFavorite(movie.id)}>
                  {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
=======
      <div className="fav-page">
        <Navbar/>
      <ul>
        {favoriteMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
>>>>>>> 2ea5445d0e0e6ff66a9f702f698ac68e87a5d631
    </div>
  );
};

export default FavoritesPage;
