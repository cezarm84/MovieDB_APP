import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';
import AddMovieForm from '../components/AddMovieForm';
import logoImage from '../assets/logo.png';
import './styles/homePage.css';
import { useStore } from '../store/store';

const HomePage: React.FC = () => {
  const movies = useStore((state) => state.movies);
  const getMovies = useStore((state) => state.getMovies);
  const getKey = useStore((state) => state.getKey);
  const user = useStore((state) => state.user);
  const totalFavoriteMovies = movies.filter((movie) => movie.is_favorite).length;

  useEffect(() => {
    const initialize = async () => {
      const apiKey = await getKey();
      if (apiKey) {
        await getMovies();
      }
    };
    initialize();
  }, [getMovies, getKey]);

  return (
    <div className="home-page">
      <Navbar />
      <div className="logo">
        <img src={logoImage} alt="Logo" />
      </div>
      <div className="add-movie-form">
        <AddMovieForm />
      </div>
      <div className="movie-list">
        <MovieList movies={movies} />
      </div>
      <footer className="footer">
      {user && (
    <p>
      Hello : {user.username},Total movies: {movies.length}, and in favorite: {totalFavoriteMovies}
    </p>
  )}
</footer>
    </div>
  );
};

export default HomePage;