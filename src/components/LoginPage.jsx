import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useNavigate } from 'react-router-dom';
import { auth } from '../auth/firebase';
import errorMessages from '../utils/errorMessages';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigateHome = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      navigateHome('/')
      console.log('User:', userCredential.user);
      
    } catch (error) {
      console.error('Error signing in:', error);
      setError(errorMessages[error.code] || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Email</label>
          <input
            type="email"
            id="username"
            className={`form-input ${error && 'invalid'}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className={`form-input ${error && 'invalid'}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
