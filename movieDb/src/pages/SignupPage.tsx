import React, { useState } from 'react';
import { useStore } from '../store/store';
import { redirect } from 'react-router-dom';
import './styles/authPage.css';

const SignupPage: React.FC = () => {
  const register = useStore((state) => state.register);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = await register({ username, password });
    setMessage(msg);
    if (msg === 'User created successfully') {
      return redirect("/"); //  to home page
    }
    return null;
  };

  
  return (
    <div className="wrapper animated-signup">
      <div className="form-container sign-up active">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
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
          <button type="submit" className="btn">Sign Up</button>
          <div className="link">
            <p>Already have an account? <a href="/login" className="signin-link">Login</a></p>
          </div>
          {message && <p>{message}</p>} {/* Display message*/}

        </form>
      </div>
    </div>
  );
};

export default SignupPage;
