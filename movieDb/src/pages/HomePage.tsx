import React from 'react';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';
import AddMovieForm from '../components/AddMovieForm';
import './styles/homePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Navbar />
      <AddMovieForm />
      <MovieList />
    </div>
  );
};

export default HomePage;
