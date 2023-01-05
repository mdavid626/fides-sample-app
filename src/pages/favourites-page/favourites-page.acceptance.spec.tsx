import React from 'react';
import { cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Routes from '../../router/routes';
import { renderWithRouterQueryClient } from '../../testing-library/render';
import { movie1, movie2 } from '../../test-data/movies';

describe('[Acceptance] favourites-page', () => {
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);
  afterEach(() => window.sessionStorage.clear());

  it('should render', async () => {
    window.sessionStorage.setItem(
      'favourites',
      JSON.stringify([movie1, movie2])
    );
    renderWithRouterQueryClient(<Routes />, undefined, ['/favourites']);
    await screen.findByText('Avatar: The Way of Water');
    expect(screen.getByText('Fides Sample App')).toBeVisible();
    expect(screen.getByText('Movies')).toBeVisible();
    expect(screen.getByText('Favourites')).toBeVisible();
    expect(screen.getByText('About')).toBeVisible();
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
    expect(screen.getByText('Dávid Molnár © 2023')).toBeVisible();
  });

  it('should be able to remove movie from favourites', async () => {
    window.sessionStorage.setItem(
      'favourites',
      JSON.stringify([movie1, movie2])
    );
    renderWithRouterQueryClient(<Routes />, undefined, ['/favourites']);
    await screen.findByText('Avatar: The Way of Water');
    userEvent.click(
      within(screen.getByTestId('MovieItem-76600')).getByTitle(
        'Remove from favourites'
      )
    );
    await waitFor(() => {
      expect(screen.queryByText('Avatar: The Way of Water')).toBe(null);
    });
    expect(screen.getByText('Glass Onion: A Knives Out Mystery')).toBeVisible();
    expect(window.sessionStorage.getItem('favourites')).toBe(
      JSON.stringify([movie2])
    );
  });

  it('should render when no favourites', async () => {
    renderWithRouterQueryClient(<Routes />, undefined, ['/favourites']);
    expect(await screen.findByText('Oops, no favourites yet!')).toBeVisible();
  });
});
