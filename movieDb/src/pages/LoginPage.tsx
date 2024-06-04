import React, { useState } from 'react';
import { useStore } from '../store/store';
import { redirect } from 'react-router-dom';
import './styles/authPage.css';

const LoginPage: React.FC = () => {
  const login = useStore((state) => state.login);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = await login({ username, password });
    setMessage(msg);
    if (msg === 'Login successful') {
      return redirect("/"); //  to home page
    }
    return null;
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
          {message && <p>{message}</p>}

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
