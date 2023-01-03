import { useQuery } from 'react-query';
import { MoviesResponse } from '../../../types/movies-response';

export const useMovies = (): [
  MoviesResponse | undefined,
  boolean,
  Error | null
] => {
  const { isFetching, error, data } = useQuery<MoviesResponse, Error>(
    'movies',
    () =>
      fetch(
        'https://mdavid626.github.io/fides-sample-app/api/movies/page/1'
      ).then((response) => response.json())
  );
  return [data, isFetching, error];
};
