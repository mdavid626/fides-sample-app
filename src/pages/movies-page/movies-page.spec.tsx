import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import MovieItem from '../../components/movie-item/movie-item';
import Pagination from '../../components/pagination/pagination';
import {
  useFavourites,
  useMovies,
} from '../../hooks/movies-hooks/movies-hooks';
import { usePagination } from '../../hooks/pagination-hooks/pagination-hooks';
import { movie1 } from '../../test-data/movies';
import { moviesResponse1 } from '../../test-data/movies-response';
import MoviesPage from './movies-page';

jest.mock('../../components/header/header');
jest.mock('../../components/footer/footer');
jest.mock('../../components/pagination/pagination');
jest.mock('../../components/movie-item/movie-item');
jest.mock('../../hooks/movies-hooks/movies-hooks');
jest.mock('../../hooks/pagination-hooks/pagination-hooks');

describe('movies-page', () => {
  beforeEach(() => {
    (Header as jest.Mock).mockReturnValue(<div>header</div>);
    (Footer as jest.Mock).mockReturnValue(<div>footer</div>);
    (Pagination as jest.Mock).mockReturnValue(<div>pagination</div>);
    (MovieItem as jest.Mock).mockReturnValue(<div>movie-item</div>);
    (useFavourites as jest.Mock).mockReturnValue([[movie1], false, null]);
    (useMovies as jest.Mock).mockReturnValue([moviesResponse1, false, null]);
    (usePagination as jest.Mock).mockReturnValue([1, jest.fn(), jest.fn()]);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const goNext = jest.fn();
    const goPrevious = jest.fn();
    (usePagination as jest.Mock).mockReturnValue([1, goNext, goPrevious]);
    const { asFragment } = render(<MoviesPage />);
    expect(asFragment()).toMatchSnapshot();
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(Pagination).toHaveBeenCalledWith(
      {
        currentPage: 1,
        numberOfPages: 7,
        goNext,
        goPrevious,
        className: 'MoviesPage-pagination',
      },
      {}
    );
    expect(MovieItem).toHaveBeenCalledTimes(3);
    expect(MovieItem).toHaveBeenCalledWith(
      {
        movie: moviesResponse1.results[0],
        isFavourite: true,
        className: 'MoviesPage-movie',
      },
      {}
    );
    expect(MovieItem).toHaveBeenCalledWith(
      {
        movie: moviesResponse1.results[1],
        isFavourite: false,
        className: 'MoviesPage-movie',
      },
      {}
    );
    expect(MovieItem).toHaveBeenCalledWith(
      {
        movie: moviesResponse1.results[2],
        isFavourite: false,
        className: 'MoviesPage-movie',
      },
      {}
    );
    expect(useMovies).toHaveBeenCalledWith(1);
    expect(useFavourites).toHaveBeenCalledWith();
    expect(usePagination).toHaveBeenCalledWith();
  });

  it('should render spinner when loading movies', () => {
    (useMovies as jest.Mock).mockReturnValue([undefined, true, null]);
    render(<MoviesPage />);
    expect(screen.getByTestId('PageLoader-spinner')).toBeVisible();
    expect(screen.getByText('header')).toBeVisible();
    expect(screen.getByText('footer')).toBeVisible();
    expect(screen.queryByText('pagination')).toBe(null);
    expect(screen.queryByText('movie-item')).toBe(null);
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(Pagination).not.toHaveBeenCalled();
    expect(MovieItem).not.toHaveBeenCalled();
  });

  it('should render spinner when loading favourites', () => {
    (useFavourites as jest.Mock).mockReturnValue([undefined, true, null]);
    render(<MoviesPage />);
    expect(screen.getByTestId('PageLoader-spinner')).toBeVisible();
    expect(screen.getByText('header')).toBeVisible();
    expect(screen.getByText('footer')).toBeVisible();
    expect(screen.queryByText('pagination')).toBe(null);
    expect(screen.queryByText('movie-item')).toBe(null);
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(Pagination).not.toHaveBeenCalled();
    expect(MovieItem).not.toHaveBeenCalled();
  });

  it('should render error when loading movies error', () => {
    (useMovies as jest.Mock).mockReturnValue([
      undefined,
      false,
      new Error('test error'),
    ]);
    render(<MoviesPage />);
    expect(screen.getByText('test error')).toBeVisible();
    expect(screen.queryByText('PageLoader-spinner')).toBe(null);
    expect(screen.getByText('header')).toBeVisible();
    expect(screen.getByText('footer')).toBeVisible();
    expect(screen.queryByText('pagination')).toBe(null);
    expect(screen.queryByText('movie-item')).toBe(null);
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(Pagination).not.toHaveBeenCalled();
    expect(MovieItem).not.toHaveBeenCalled();
  });

  it('should render error when loading favourites error', () => {
    (useFavourites as jest.Mock).mockReturnValue([
      undefined,
      false,
      new Error('test error'),
    ]);
    render(<MoviesPage />);
    expect(screen.getByText('test error')).toBeVisible();
    expect(screen.queryByText('PageLoader-spinner')).toBe(null);
    expect(screen.getByText('header')).toBeVisible();
    expect(screen.getByText('footer')).toBeVisible();
    expect(screen.queryByText('pagination')).toBe(null);
    expect(screen.queryByText('movie-item')).toBe(null);
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(Pagination).not.toHaveBeenCalled();
    expect(MovieItem).not.toHaveBeenCalled();
  });
});
