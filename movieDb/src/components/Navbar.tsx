import { useStore } from '../store/store';
import { useNavigate } from 'react-router-dom';
import './styles/navbar.css';

const Navbar: React.FC = () => {
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
