import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from '../testing-library/render';
import MoviesPage from '../pages/movies-page/movies-page';
import AboutPage from '../pages/about-page/about-page';
import FavouritesPage from '../pages/favourites-page/favourites-page';
import Routes from './routes';

jest.mock('../pages/movies-page/movies-page');
jest.mock('../pages/about-page/about-page');
jest.mock('../pages/favourites-page/favourites-page');

describe('routes', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockReturnValue(undefined);
    (MoviesPage as jest.Mock).mockReturnValue(<div>movies-page</div>);
    (AboutPage as jest.Mock).mockReturnValue(<div>about-page</div>);
    (FavouritesPage as jest.Mock).mockReturnValue(<div>favourites-page</div>);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  const pages: string[] = ['/', '/favourites', '/about'];
  it.each(pages)('should render "%s" page', (page) => {
    const { asFragment } = renderWithRouter(<Routes />, undefined, [page]);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render default page when unknown route', () => {
    renderWithRouter(<Routes />, undefined, ['/unknown']);
    expect(screen.getByText('movies-page')).toBeVisible();
  });

  it('should throw error on error route', () => {
    expect(() => renderWithRouter(<Routes />, undefined, ['/error'])).toThrow(
      'test error'
    );
  });
});
