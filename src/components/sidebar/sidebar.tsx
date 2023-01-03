import React from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css';

const Sidebar: React.FC = () => (
  <div className="Sidebar">
    <div className="Sidebar-header">Fides Sample App</div>
    <div className="Sidebar-navigation">
      <Link to="/">Movies</Link>
      <Link to="/about">About</Link>
    </div>
  </div>
);

export default Sidebar;
