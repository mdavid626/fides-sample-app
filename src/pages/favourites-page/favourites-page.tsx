import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import PageLoader from '../../components/page-loader/page-loader';
import MovieItem from '../../components/movie-item/movie-item';
import Footer from '../../components/footer/footer';
import { useFavourites } from '../../hooks/movies-hooks/movies-hooks';

import './favourites-page.css';

const FavouritesPage: React.FC = () => {
  const [favourites, isFavouritesFetching, favouritesError] = useFavourites();
  return (
    <div className="FavouritesPage">
      <Header />
      <PageLoader
        isLoading={isFavouritesFetching}
        errorMessage={favouritesError?.message}
      >
        {favourites ? (
          <>
            {favourites.length > 0 ? (
              <div className="FavouritesPage-movies">
                {favourites.map((movie) => (
                  <MovieItem key={movie.id} movie={movie} isFavourite />
                ))}
              </div>
            ) : (
              <div className="FavouritesPage-emptyContent">
                <div className="FavouritesPage-emptyContentTitle">
                  Oops, no favourites yet!
                </div>
                <div>
                  Go to <Link to="/">Movies</Link> to add some.
                </div>
              </div>
            )}
          </>
        ) : null}
      </PageLoader>
      <Footer />
    </div>
  );
};

export default FavouritesPage;
