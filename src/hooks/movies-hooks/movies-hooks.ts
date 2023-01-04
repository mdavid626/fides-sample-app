import { useQuery, useMutation, useQueryClient } from 'react-query';
import moviesService from '../../services/movies-service';
import { Movie, MoviesResponse } from '../../../types/movies-response';

export const useMovies = (
  currentPage: number
): [MoviesResponse | undefined, boolean, Error | null] => {
  const { isFetching, error, data } = useQuery<MoviesResponse, Error>(
    ['movies', currentPage],
    () => moviesService.getMovies(currentPage)
  );
  return [data, isFetching, error];
};

export const useFavourites = (): [
  Movie[] | undefined,
  boolean,
  Error | null
] => {
  const { isFetching, error, data } = useQuery<Movie[], Error>(
    'favourites',
    () => moviesService.getFavourites()
  );
  return [data, isFetching, error];
};

export const useAddToFavourites = (): [(movie: Movie) => void, boolean] => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation<Movie[], Error, Movie>(
    (movie) => moviesService.addToFavourites(movie),
    {
      onError: (error) => {
        window.alert(error.message);
      },
      onSuccess: (movies) => {
        queryClient.setQueryData('favourites', movies);
      },
    }
  );
  return [mutate, isLoading];
};

export const useRemoveFromFavourites = (): [
  (movie: Movie) => void,
  boolean
] => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation<Movie[], Error, Movie>(
    (movie) => moviesService.removeFromFavourites(movie),
    {
      onError: (error) => {
        window.alert(error.message);
      },
      onSuccess: (movies) => {
        queryClient.setQueryData('favourites', movies);
      },
    }
  );
  return [mutate, isLoading];
};
