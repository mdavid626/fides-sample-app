import { useQuery } from 'react-query';
import moviesService from '../../services/movies-service';
import { MoviesResponse } from '../../../types/movies-response';

export const useMovies = (): [
  MoviesResponse | undefined,
  boolean,
  Error | null
] => {
  const { isFetching, error, data } = useQuery<MoviesResponse, Error>(
    'movies',
    () => moviesService.getMovies(1)
  );
  return [data, isFetching, error];
};
