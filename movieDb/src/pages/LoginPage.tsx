import React, { useState } from 'react';
import { useStore } from '../store/store';
import './styles/authPage.css';

const LoginPage: React.FC = () => {
  const login = useStore((state) => state.login);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className="wrapper animated-signin">
      <div className="form-container sign-in active">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="fas fa-user"></i>
            <label>Username</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fas fa-lock"></i>
            <label>Password</label>
          </div>
          <button type="submit" className="btn">Login</button>
          <div className="link">
            <p>Don't have an account? <a href="/signup" className="signup-link">Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
