import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import MovieDetailsPage from './pages/MoviePage';
import { useStore } from './store/store';

const App: React.FC = () => {
  const user = useStore((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
