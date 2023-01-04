import React from 'react';
import Header from '../../components/header/header';
import PageLoader from '../../components/page-loader/page-loader';
import MovieItem from '../../components/movie-item/movie-item';
import Pagination from '../../components/pagination/pagination';
import { useMovies } from '../../hooks/movies-hooks/movies-hooks';
import { usePagination } from '../../hooks/pagination-hooks/pagination-hooks';

import './movies-page.css';

const MoviesPage: React.FC = () => {
  const [currentPage, goNext, goPrevious] = usePagination();
  const [movies, isFetching, error] = useMovies(currentPage);
  return (
    <div className="MoviesPage">
      <Header />
      <PageLoader isLoading={isFetching} errorMessage={error?.message}>
        {movies ? (
          <div className="MoviesPage-content">
            <Pagination
              currentPage={currentPage}
              numberOfPages={movies.total_pages}
              goNext={goNext}
              goPrevious={goPrevious}
              className="MoviesPage-pagination"
            />
            <div className="MoviesPage-movies">
              {movies.results.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ) : null}
      </PageLoader>
    </div>
  );
};

export default MoviesPage;
