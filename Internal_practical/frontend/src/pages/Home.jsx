import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="home">
      <main className="main-content">
        <div className="container">
          <h1>Welcome to Our App</h1>
          <p className="lead">A simple, clean solution for your needs</p>
          <div className="cta-buttons">
            <Link to="/login" className="btn btn-primary">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-outline">
              Create Account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
