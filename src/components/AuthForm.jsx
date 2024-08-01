import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', rememberMe: false });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    agreeToTerms: false
  });

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleLoginChange = (e) => {
    const { id, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterChange = (e) => {
    const { id, value, type, checked } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Handle register logic here
  };

  return (
    <div>
      {/* Pills navs */}
      <ul className="nav nav-pills nav-justified mb-3" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
            role="tab"
          >
            Login
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabChange('register')}
            role="tab"
          >
            Register
          </a>
        </li>
      </ul>
      {/* Pills content */}
      <div className="tab-content">
        {activeTab === 'login' && (
          <div className="tab-pane fade show active" role="tabpanel">
            <form onSubmit={handleLoginSubmit}>
              <div className="text-center mb-3">
                <p>Sign in with:</p>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <FontAwesomeIcon icon={faFacebookF} />
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <FontAwesomeIcon icon={faTwitter} />
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <FontAwesomeIcon icon={faGithub} />
                </button>
              </div>
              <p className="text-center">or:</p>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                />
                <label className="form-label" htmlFor="email">Email or username</label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                />
                <label className="form-label" htmlFor="password">Password</label>
              </div>
              <div className="row mb-4">
                <div className="col-md-6 d-flex justify-content-center">
                  <div className="form-check mb-3 mb-md-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked={loginForm.rememberMe}
                      onChange={handleLoginChange}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                  </div>
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                  <a href="#!">Forgot password?</a>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
              <div className="text-center">
                <p>Not a member? <a href="#!" onClick={() => handleTabChange('register')}>Register</a></p>
              </div>
            </form>
          </div>
        )}
        {activeTab === 'register' && (
          <div className="tab-pane fade" role="tabpanel">
            <form onSubmit={handleRegisterSubmit}>
              <div className="text-center mb-3">
                <p>Sign up with:</p>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <FontAwesomeIcon icon={faFacebookF} />
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <FontAwesomeIcon icon={faTwitter} />
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <FontAwesomeIcon icon={faGithub} />
                </button>
              </div>
              <p className="text-center">or:</p>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                />
                <label className="form-label" htmlFor="name">Name</label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={registerForm.username}
                  onChange={handleRegisterChange}
                />
                <label className="form-label" htmlFor="username">Username</label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                />
                <label className="form-label" htmlFor="email">Email</label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                />
                <label className="form-label" htmlFor="password">Password</label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="repeatPassword"
                  className="form-control"
                  value={registerForm.repeatPassword}
                  onChange={handleRegisterChange}
                />
                <label className="form-label" htmlFor="repeatPassword">Repeat password</label>
              </div>
              <div className="form-check d-flex justify-content-center mb-4">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  id="agreeToTerms"
                  checked={registerForm.agreeToTerms}
                  onChange={handleRegisterChange}
                />
                <label className="form-check-label" htmlFor="agreeToTerms">
                  I have read and agree to the terms
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
