import { Movie, MoviesResponse } from '../../types/movies-response';

const getMovies = (pageNumber: number): Promise<MoviesResponse> =>
  fetch(
    `https://mdavid626.github.io/fides-sample-app/api/movies/page/${pageNumber}`
  ).then((response) => response.json());

const getFavourites = async (): Promise<Movie[]> => {
  const favourites = window.sessionStorage.getItem('favourites');
  return favourites ? (JSON.parse(favourites) as Movie[]) : [];
};

const addToFavourites = async (movie: Movie): Promise<Movie[]> => {
  const favourites = await getFavourites();
  const newFavourites = [...favourites, movie];
  window.sessionStorage.setItem('favourites', JSON.stringify(newFavourites));
  return newFavourites;
};

const removeFromFavourites = async (movie: Movie): Promise<Movie[]> => {
  const favourites = await getFavourites();
  const newFavourites = favourites.filter(
    (favouriteMovie) => favouriteMovie.id !== movie.id
  );
  window.sessionStorage.setItem('favourites', JSON.stringify(newFavourites));
  return newFavourites;
};

export default {
  getMovies,
  getFavourites,
  addToFavourites,
  removeFromFavourites,
};
