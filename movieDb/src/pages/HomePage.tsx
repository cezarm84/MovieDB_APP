import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';
import AddMovieForm from '../components/AddMovieForm';
import './styles/homePage.css';
import { useStore } from '../store/store';

const HomePage: React.FC = () => {
  const movies = useStore((state) => state.movies);
  const getMovies = useStore((state) => state.getMovies);
  const getKey = useStore((state) => state.getKey);

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
      <div className="add-movie-form">
        <AddMovieForm />
      </div>
      <div className="movie-list">
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default HomePage;
