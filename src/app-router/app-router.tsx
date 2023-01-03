import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MoviesPage from '../pages/movies-page/movies-page';
import AboutPage from '../pages/about-page/about-page';
import React from 'react';

const AppRouter = () => (
  <BrowserRouter basename="/fides-sample-app">
    <Routes>
      <Route path="/" element={<MoviesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
