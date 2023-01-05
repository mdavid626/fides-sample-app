import React from 'react';
import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import MoviesPage from '../pages/movies-page/movies-page';
import AboutPage from '../pages/about-page/about-page';
import FavouritesPage from '../pages/favourites-page/favourites-page';

const ErrorPage: React.FC = () => {
  throw new Error('test error');
};

const Routes: React.FC = () => (
  <RouterRoutes>
    <Route path="/" element={<MoviesPage />} />
    <Route path="/favourites" element={<FavouritesPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/error" element={<ErrorPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </RouterRoutes>
);

export default Routes;
