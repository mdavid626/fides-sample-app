import fetchMock from 'jest-fetch-mock';
import { moviesResponse1 } from '../test-data/movies-response';
import moviesService from './movies-service';
import { movie1, movie2, movie3, movies } from '../test-data/movies';

describe('movies-service', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  afterEach(jest.resetAllMocks);
  afterEach(() => window.sessionStorage.clear());

  describe('getMovies', () => {
    it('should fetch movies', async () => {
      fetchMock.mockResponse(JSON.stringify(moviesResponse1));
      const moviesResponse = await moviesService.getMovies(1);
      expect(moviesResponse).toEqual(moviesResponse1);
      expect(fetchMock).toHaveBeenCalledWith(
        'https://mdavid626.github.io/fides-sample-app/api/movies/page/1'
      );
    });

    it('should throw error when error', async () => {
      fetchMock.mockRejectedValue(new Error('test error'));
      await expect(moviesService.getMovies(1)).rejects.toThrow('test error');
    });
  });

  describe('getFavourites', () => {
    it('should return favourites', async () => {
      window.sessionStorage.setItem('favourites', JSON.stringify(movies));
      const favourites = await moviesService.getFavourites();
      expect(favourites).toEqual(movies);
    });

    it('should return empty array when no session storage entry', async () => {
      const favourites = await moviesService.getFavourites();
      expect(favourites).toEqual([]);
    });
  });

  describe('addToFavourites', () => {
    it('should add to favourites', async () => {
      window.sessionStorage.setItem(
        'favourites',
        JSON.stringify([movie1, movie2])
      );
      const favourites = await moviesService.addToFavourites(movie3);
      expect(favourites).toEqual([movie1, movie2, movie3]);
      expect(window.sessionStorage.getItem('favourites')).toBe(
        JSON.stringify([movie1, movie2, movie3])
      );
    });

    it('should add to favourites when no favourites', async () => {
      const favourites = await moviesService.addToFavourites(movie1);
      expect(favourites).toEqual([movie1]);
      expect(window.sessionStorage.getItem('favourites')).toBe(
        JSON.stringify([movie1])
      );
    });
  });

  describe('removeFromFavourites', () => {
    it('should remove from favourites', async () => {
      window.sessionStorage.setItem(
        'favourites',
        JSON.stringify([movie1, movie2, movie3])
      );
      const favourites = await moviesService.removeFromFavourites(movie2);
      expect(favourites).toEqual([movie1, movie3]);
      expect(window.sessionStorage.getItem('favourites')).toBe(
        JSON.stringify([movie1, movie3])
      );
    });

    it('should not remove when not in favourites', async () => {
      window.sessionStorage.setItem(
        'favourites',
        JSON.stringify([movie1, movie3])
      );
      const favourites = await moviesService.removeFromFavourites(movie2);
      expect(favourites).toEqual([movie1, movie3]);
      expect(window.sessionStorage.getItem('favourites')).toBe(
        JSON.stringify([movie1, movie3])
      );
    });

    it('should keep empty when no favourites', async () => {
      const favourites = await moviesService.removeFromFavourites(movie1);
      expect(favourites).toEqual([]);
      expect(window.sessionStorage.getItem('favourites')).toBe(
        JSON.stringify([])
      );
    });
  });
});
