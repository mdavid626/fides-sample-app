import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import MoviesPage from '../pages/movies-page/movies-page';
import AboutPage from '../pages/about-page/about-page';
import FavouritesPage from '../pages/favourites-page/favourites-page';

const AppRouter: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<MoviesPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </HashRouter>
);

export default AppRouter;