import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import { useStore } from './store/store';
import './App.css'

const App: React.FC = () => {
  const user = useStore((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/movie/:imdbid" element={<MovieDetailsPage />} />
        <Route path="/favoritesPage" element={<FavoritesPage/>} />
      </Routes>
     
    </Router>
  );
};

export default App;