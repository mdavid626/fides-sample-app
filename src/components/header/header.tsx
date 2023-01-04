import React from 'react';
import classnames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import './header.css';

const links = [
  { path: '/', title: 'Movies' },
  { path: '/favourites', title: 'Favourites' },
  { path: '/about', title: 'About' },
];

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <div className="Header">
      <div className="Header-title">Fides Sample App</div>
      <div className="Header-navigation">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={classnames('Header-link', {
              'Header-selectedLink': link.path === location.pathname,
            })}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
