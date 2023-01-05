import { cleanup, waitFor } from '@testing-library/react';
import moviesService from '../../services/movies-service';
import { movie1, movies } from '../../test-data/movies';
import { renderHookWithQueryClient } from '../../testing-library/render';
import {
  useAddToFavourites,
  useFavourites,
  useMovies,
  useRemoveFromFavourites,
} from './movies-hooks';

jest.mock('../../services/movies-service');

describe('movies-hooks', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockReturnValue(undefined);
    jest.spyOn(window, 'alert').mockReturnValue(undefined);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  describe('useMovies', () => {
    it('should load movies', async () => {
      (moviesService.getMovies as jest.Mock).mockResolvedValue(movies);
      const { result } = renderHookWithQueryClient(() => useMovies(1));
      expect(result.current).toEqual([undefined, true, null]);
      await waitFor(() => {
        expect(result.current).toEqual([movies, false, null]);
      });
      expect(moviesService.getMovies).toHaveBeenCalledWith(1);
    });

    it('should return error when error', async () => {
      (moviesService.getMovies as jest.Mock).mockRejectedValue(
        new Error('test error')
      );
      const { result } = renderHookWithQueryClient(() => useMovies(1));
      expect(result.current).toEqual([undefined, true, null]);
      await waitFor(() => {
        expect(result.current).toEqual([
          undefined,
          false,
          new Error('test error'),
        ]);
      });
    });
  });

  describe('useFavourites', () => {
    it('should load favourites', async () => {
      (moviesService.getFavourites as jest.Mock).mockResolvedValue(movies);
      const { result } = renderHookWithQueryClient(() => useFavourites());
      expect(result.current).toEqual([undefined, true, null]);
      await waitFor(() => {
        expect(result.current).toEqual([movies, false, null]);
      });
      expect(moviesService.getFavourites).toHaveBeenCalledWith();
    });

    it('should return error when error', async () => {
      (moviesService.getFavourites as jest.Mock).mockRejectedValue(
        new Error('test error')
      );
      const { result } = renderHookWithQueryClient(() => useFavourites());
      expect(result.current).toEqual([undefined, true, null]);
      await waitFor(() => {
        expect(result.current).toEqual([
          undefined,
          false,
          new Error('test error'),
        ]);
      });
    });
  });

  describe('useAddToFavourites', () => {
    it('should add to favourites', async () => {
      (moviesService.addToFavourites as jest.Mock).mockResolvedValue(movies);
      const { result, queryClient } = renderHookWithQueryClient(() =>
        useAddToFavourites()
      );
      expect(result.current).toEqual([expect.any(Function), false]);
      result.current[0](movie1);
      await waitFor(() => {
        expect(moviesService.addToFavourites).toHaveBeenCalledWith(movie1);
      });
      expect(queryClient.getQueryData('favourites')).toEqual(movies);
    });

    it('should inform user when error', async () => {
      (moviesService.addToFavourites as jest.Mock).mockRejectedValue(
        new Error('test error')
      );
      const { result } = renderHookWithQueryClient(() => useAddToFavourites());
      result.current[0](movie1);
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('test error');
      });
    });
  });

  describe('useRemoveFromFavourites', () => {
    it('should remove from favourites', async () => {
      (moviesService.removeFromFavourites as jest.Mock).mockResolvedValue(
        movies
      );
      const { result, queryClient } = renderHookWithQueryClient(() =>
        useRemoveFromFavourites()
      );
      expect(result.current).toEqual([expect.any(Function), false]);
      result.current[0](movie1);
      await waitFor(() => {
        expect(moviesService.removeFromFavourites).toHaveBeenCalledWith(movie1);
      });
      expect(queryClient.getQueryData('favourites')).toEqual(movies);
    });

    it('should inform user when error', async () => {
      (moviesService.removeFromFavourites as jest.Mock).mockRejectedValue(
        new Error('test error')
      );
      const { result } = renderHookWithQueryClient(() =>
        useRemoveFromFavourites()
      );
      result.current[0](movie1);
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('test error');
      });
    });
  });
});
