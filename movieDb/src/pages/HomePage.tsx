import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';
import AddMovieForm from '../components/AddMovieForm';
import './styles/homePage.css';
import { useStore } from '../store/store';
import React, { useEffect } from 'react';


const HomePage: React.FC = () => {
  const movies = useStore((state) => state.movies);
  const getMovies = useStore((state) => state.getMovies);
  const getApiKey = useStore((state) => state.getApiKey);

  useEffect(() => {
    const initialize = async () => {
      await getApiKey();
      getMovies();
    };
    initialize();
  }, [getMovies, getApiKey]);

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
