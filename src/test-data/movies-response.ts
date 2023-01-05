import { MoviesResponse } from '../../types/movies-response';
import { movies } from './movies';

export const moviesResponse1: MoviesResponse = {
  page: 1,
  results: movies,
  total_pages: 7,
};
