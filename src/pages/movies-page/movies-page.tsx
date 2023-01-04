import React from 'react';
import Header from '../../components/header/header';
import PageLoader from '../../components/page-loader/page-loader';
import MovieItem from '../../components/movie-item/movie-item';
import Pagination from '../../components/pagination/pagination';
import Footer from '../../components/footer/footer';
import {
  useFavourites,
  useMovies,
} from '../../hooks/movies-hooks/movies-hooks';
import { usePagination } from '../../hooks/pagination-hooks/pagination-hooks';

import './movies-page.css';

const MoviesPage: React.FC = () => {
  const [favourites, isFavouritesFetching, favouritesError] = useFavourites();
  const [currentPage, goNext, goPrevious] = usePagination();
  const [movies, isMoviesFetching, moviesError] = useMovies(currentPage);
  return (
    <div className="MoviesPage">
      <Header />
      <PageLoader
        isLoading={isMoviesFetching || isFavouritesFetching}
        errorMessage={moviesError?.message || favouritesError?.message}
      >
        {movies && favourites ? (
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
                <MovieItem
                  key={movie.id}
                  movie={movie}
                  isFavourite={favourites.some(
                    (favouriteMovie) => favouriteMovie.id === movie.id
                  )}
                />
              ))}
            </div>
          </div>
        ) : null}
      </PageLoader>
      <Footer />
    </div>
  );
};

export default MoviesPage;
