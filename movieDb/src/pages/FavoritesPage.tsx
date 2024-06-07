import { useEffect } from 'react';
import { useStore } from '../store/store'; 
import Navbar from '../components/Navbar';
import styles  from './styles/favoritesPage.module.css';

const FavoritesPage = () => {
  const { movies, getMovies } = useStore();

  useEffect(() => {
    getMovies(); 
  }, [getMovies]);

  
  const favoriteMovies = movies.filter(movie => movie.isFavorite);

  return (
    <div>
        <Navbar/>
      <ul>
        {favoriteMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;

