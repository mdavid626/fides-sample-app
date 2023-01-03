import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import PageLoader from '../../components/page-loader/page-loader';
import { useMovies } from '../../hooks/movies-hooks/movies-hooks';
import MovieItem from '../../components/movie-item/movie-item';

import './movies-page.css';

const MoviesPage: React.FC = () => {
  const [movies, isFetching, error] = useMovies();
  return (
    <div className="MoviesPage">
      <Sidebar />
      <PageLoader isLoading={isFetching} errorMessage={error?.message}>
        <div className="MoviesPage-content">
          {movies &&
            movies.results.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
        </div>
      </PageLoader>
    </div>
  );
};

export default MoviesPage;
