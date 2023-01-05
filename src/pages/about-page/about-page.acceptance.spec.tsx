import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import Routes from '../../router/routes';
import { renderWithRouterQueryClient } from '../../testing-library/render';

describe('[Acceptance] about-page', () => {
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', async () => {
    renderWithRouterQueryClient(<Routes />, undefined, ['/about']);
    expect(
      await screen.findByText('Simple React app created for Fides')
    ).toBeVisible();
    expect(screen.getByText('Fides Sample App')).toBeVisible();
    expect(screen.getByText('Movies')).toBeVisible();
    expect(screen.getByText('Favourites')).toBeVisible();
    expect(screen.getByText('About')).toBeVisible();
    expect(screen.getByText('Created by:')).toBeVisible();
    expect(screen.getByText('Dávid Molnár')).toBeVisible();
    expect(screen.getByText('Source Code')).toBeVisible();
    expect(screen.getByText('Dávid Molnár © 2023')).toBeVisible();
  });
});
