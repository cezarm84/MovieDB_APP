import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';
import AddMovieForm from '../components/AddMovieForm';
import './styles/homePage.css';
import { useStore } from '../store/store';

const HomePage: React.FC = () => {
  const movies = useStore((state) => state.movies);
 

  return (
    <div className="home-page">
      <Navbar />
      <AddMovieForm />
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;