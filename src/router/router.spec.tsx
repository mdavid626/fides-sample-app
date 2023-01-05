import React from 'react';
import { cleanup, render } from '@testing-library/react';
import MoviesPage from '../pages/movies-page/movies-page';
import AboutPage from '../pages/about-page/about-page';
import FavouritesPage from '../pages/favourites-page/favourites-page';
import Router from './router';

jest.mock('../pages/movies-page/movies-page');
jest.mock('../pages/about-page/about-page');
jest.mock('../pages/favourites-page/favourites-page');

describe('router', () => {
  beforeEach(() => {
    (MoviesPage as jest.Mock).mockReturnValue(<div>movies-page</div>);
    (AboutPage as jest.Mock).mockReturnValue(<div>about-page</div>);
    (FavouritesPage as jest.Mock).mockReturnValue(<div>favourites-page</div>);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const { asFragment } = render(<Router />);
    expect(asFragment()).toMatchSnapshot();
    expect(MoviesPage).toHaveBeenCalledWith({}, {});
    expect(AboutPage).not.toHaveBeenCalled();
    expect(FavouritesPage).not.toHaveBeenCalled();
  });
});
