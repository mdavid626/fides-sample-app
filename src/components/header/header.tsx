import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header: React.FC = () => (
  <div className="Header">
    <div className="Header-title">Fides Sample App</div>
    <div className="Header-navigation">
      <Link to="/">Movies</Link>
      <Link to="/about">About</Link>
    </div>
  </div>
);

export default Header;
