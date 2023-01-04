import { useQuery } from 'react-query';
import moviesService from '../../services/movies-service';
import { MoviesResponse } from '../../../types/movies-response';

export const useMovies = (
  currentPage: number
): [MoviesResponse | undefined, boolean, Error | null] => {
  const { isFetching, error, data } = useQuery<MoviesResponse, Error>(
    ['movies', currentPage],
    () => moviesService.getMovies(currentPage)
  );
  return [data, isFetching, error];
};
