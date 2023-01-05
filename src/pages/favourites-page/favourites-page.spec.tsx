import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import MovieItem from '../../components/movie-item/movie-item';
import { useFavourites } from '../../hooks/movies-hooks/movies-hooks';
import { movies } from '../../test-data/movies';
import { renderWithRouter } from '../../testing-library/render';
import FavouritesPage from './favourites-page';

jest.mock('../../components/header/header');
jest.mock('../../components/footer/footer');
jest.mock('../../components/movie-item/movie-item');
jest.mock('../../hooks/movies-hooks/movies-hooks');

describe('favourites-page', () => {
  beforeEach(() => {
    (Header as jest.Mock).mockReturnValue(<div>header</div>);
    (Footer as jest.Mock).mockReturnValue(<div>footer</div>);
    (MovieItem as jest.Mock).mockReturnValue(<div>movie-item</div>);
    (useFavourites as jest.Mock).mockReturnValue([movies, false, null]);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const { asFragment } = renderWithRouter(<FavouritesPage />);
    expect(asFragment()).toMatchSnapshot();
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(MovieItem).toHaveBeenCalledTimes(3);
    expect(MovieItem).toHaveBeenCalledWith(
      {
        movie: movies[0],
        isFavourite: true,
        className: 'FavouritesPage-movie',
      },
      {}
    );
    expect(MovieItem).toHaveBeenCalledWith(
      {
        movie: movies[1],
        isFavourite: true,
        className: 'FavouritesPage-movie',
      },
      {}
    );
    expect(MovieItem).toHaveBeenCalledWith(
      {
        movie: movies[2],
        isFavourite: true,
        className: 'FavouritesPage-movie',
      },
      {}
    );
    expect(useFavourites).toHaveBeenCalledWith();
  });

  it('should render spinner when loading', () => {
    (useFavourites as jest.Mock).mockReturnValue([undefined, true, null]);
    renderWithRouter(<FavouritesPage />);
    expect(screen.getByTestId('PageLoader-spinner')).toBeVisible();
    expect(screen.getByText('header')).toBeVisible();
    expect(screen.getByText('footer')).toBeVisible();
    expect(screen.queryByText('movie-item')).toBe(null);
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(MovieItem).not.toHaveBeenCalled();
  });

  it('should render error when loading error', () => {
    (useFavourites as jest.Mock).mockReturnValue([
      undefined,
      false,
      new Error('test error'),
    ]);
    renderWithRouter(<FavouritesPage />);
    expect(screen.getByText('test error')).toBeVisible();
    expect(screen.queryByTestId('PageLoader-spinner')).toBe(null);
    expect(screen.getByText('header')).toBeVisible();
    expect(screen.getByText('footer')).toBeVisible();
    expect(screen.queryByText('movie-item')).toBe(null);
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(MovieItem).not.toHaveBeenCalled();
  });

  it('should render empty state text when no favourites', () => {
    (useFavourites as jest.Mock).mockReturnValue([[], false, null]);
    const { asFragment } = renderWithRouter(<FavouritesPage />);
    expect(asFragment()).toMatchSnapshot();
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(MovieItem).not.toHaveBeenCalled();
  });
});
