import fetchMock from 'jest-fetch-mock';
import { moviesResponse1 } from '../test-data/movies-response';
import moviesService from './movies-service';

describe('movies-service', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  afterEach(jest.resetAllMocks);

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
});
