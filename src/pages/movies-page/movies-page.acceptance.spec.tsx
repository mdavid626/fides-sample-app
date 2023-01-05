import React from 'react';
import { cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import Routes from '../../router/routes';
import { renderWithRouterQueryClient } from '../../testing-library/render';
import { moviesResponse1 } from '../../test-data/movies-response';
import { movie1 } from '../../test-data/movies';

describe('[Acceptance] movies-page', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(moviesResponse1));
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);
  afterEach(() => window.sessionStorage.clear());

  it('should render', async () => {
    renderWithRouterQueryClient(<Routes />);
    expect(await screen.findByText('Avatar: The Way of Water')).toBeVisible();
    expect(screen.getByText('Fides Sample App')).toBeVisible();
    expect(screen.getByText('Movies')).toBeVisible();
    expect(screen.getByText('Favourites')).toBeVisible();
    expect(screen.getByText('About')).toBeVisible();
    expect(screen.getByText('1/7')).toBeVisible();
    expect(
      screen.getByText(
        'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.'
      )
    ).toBeVisible();
    expect(screen.getByText('Glass Onion: A Knives Out Mystery')).toBeVisible();
    expect(
      screen.getByText(
        'World-famous detective Benoit Blanc heads to Greece to peel back the layers of a mystery surrounding a tech billionaire and his eclectic crew of friends.'
      )
    ).toBeVisible();
    expect(screen.getByText('Violent Night')).toBeVisible();
    expect(
      screen.getByText(
        'When a team of mercenaries breaks into a wealthy family compound on Christmas Eve, taking everyone inside hostage, the team isn’t prepared for a surprise combatant: Santa Claus is on the grounds, and he’s about to show why this Nick is no saint.'
      )
    ).toBeVisible();
    expect(screen.getByText('Dávid Molnár © 2023')).toBeVisible();
  });

  it('should be able to mark movie as favourite', async () => {
    renderWithRouterQueryClient(<Routes />);
    await screen.findByText('Avatar: The Way of Water');
    const movieItem = screen.getByTestId('MovieItem-76600');
    userEvent.click(within(movieItem).getByTitle('Add to favourites'));
    await waitFor(() => {
      expect(
        within(movieItem).getByTitle('Remove from favourites')
      ).toBeVisible();
    });
    expect(within(movieItem).queryByTitle('Add to favourites')).toBe(null);
    expect(window.sessionStorage.getItem('favourites')).toBe(
      JSON.stringify([movie1])
    );
  });

  it('should be able to remove movie from favourites', async () => {
    window.sessionStorage.setItem('favourites', JSON.stringify([movie1]));
    renderWithRouterQueryClient(<Routes />);
    await screen.findByText('Avatar: The Way of Water');
    const movieItem = screen.getByTestId('MovieItem-76600');
    userEvent.click(within(movieItem).getByTitle('Remove from favourites'));
    await waitFor(() => {
      expect(within(movieItem).getByTitle('Add to favourites')).toBeVisible();
    });
    expect(within(movieItem).queryByTitle('Remove from favourites')).toBe(null);
    expect(window.sessionStorage.getItem('favourites')).toBe(
      JSON.stringify([])
    );
  });
});
