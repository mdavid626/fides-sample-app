import { MoviesResponse } from '../../types/movies-response';

const getMovies = (pageNumber: number): Promise<MoviesResponse> =>
  fetch(
    `https://mdavid626.github.io/fides-sample-app/api/movies/page/${pageNumber}`
  ).then((response) => response.json());

export default {
  getMovies,
};
