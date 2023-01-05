import { act, cleanup, waitFor } from '@testing-library/react';
import { renderHookWithRouter } from '../../testing-library/render';
import { usePagination } from './pagination-hooks';

describe('pagination-hooks', () => {
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  describe('usePagination', () => {
    const currentPageCases: [string, number][] = [
      ['/', 1],
      ['/?page=1', 1],
      ['/?page=2', 2],
      ['/?page=abc', 1],
      ['/?page=-1', 1],
      ['/?page=-2', 1],
      ['/?page=7', 7],
      ['/?page=8', 7],
      ['/?page=100', 7],
    ];
    it.each(currentPageCases)(
      'should return page number when "%s" URL',
      (initialEntry, currentPage) => {
        const { result } = renderHookWithRouter(
          () => usePagination(),
          undefined,
          [initialEntry]
        );
        expect(result.current[0]).toBe(currentPage);
      }
    );

    it('should go to next page', async () => {
      const { result, router } = renderHookWithRouter(
        () => usePagination(),
        undefined,
        ['/?page=1&test=1']
      );
      act(() => {
        result.current[1]();
      });
      await waitFor(() => {
        expect(result.current[0]).toBe(2);
      });
      expect(router.location?.search).toBe('?page=2&test=1');
    });

    it('should go to previous page', async () => {
      const { result, router } = renderHookWithRouter(
        () => usePagination(),
        undefined,
        ['/?page=3&test=1']
      );
      act(() => {
        result.current[2]();
      });
      await waitFor(() => {
        expect(result.current[0]).toBe(2);
      });
      expect(router.location?.search).toBe('?page=2&test=1');
    });
  });
});
