import { cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import Routes from './router/routes';
import { movie1 } from './test-data/movies';
import { moviesResponse1 } from './test-data/movies-response';
import { renderWithRouterQueryClient } from './testing-library/render';

describe('[Acceptance] app', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(moviesResponse1));
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);
  afterEach(() => window.sessionStorage.clear());

  it('should be able click through pages', async () => {
    const { router } = renderWithRouterQueryClient(<Routes />);

    expect(await screen.findByText('Avatar: The Way of Water')).toBeVisible();
    expect(screen.getByText('Fides Sample App')).toBeVisible();
    expect(screen.getByText('Glass Onion: A Knives Out Mystery')).toBeVisible();
    expect(screen.getByText('Violent Night')).toBeVisible();

    const movieItem = screen.getByTestId('MovieItem-76600');
    await userEvent.click(within(movieItem).getByTitle('Add to favourites'));
    await waitFor(() => {
      expect(
        within(movieItem).getByTitle('Remove from favourites')
      ).toBeVisible();
    });
    expect(window.sessionStorage.getItem('favourites')).toBe(
      JSON.stringify([movie1])
    );

    await userEvent.click(screen.getByText('Favourites'));
    expect(await screen.findByText('Avatar: The Way of Water')).toBeVisible();
    expect(screen.queryByText('Glass Onion: A Knives Out Mystery')).toBe(null);
    expect(screen.queryByText('Violent Night')).toBe(null);
    expect(router.location?.pathname).toBe('/favourites');

    await userEvent.click(screen.getByText('About'));
    expect(
      await screen.findByText('Simple React app created for Fides')
    ).toBeVisible();
    expect(router.location?.pathname).toBe('/about');
  });
});
