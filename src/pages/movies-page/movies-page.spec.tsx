import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import MovieItem from '../../components/movie-item/movie-item';
import {
  useFavourites,
  useMovies,
} from '../../hooks/movies-hooks/movies-hooks';
import { usePagination } from '../../hooks/pagination-hooks/pagination-hooks';
import { movie1 } from '../../test-data/movies';
import { moviesResponse1 } from '../../test-data/movies-response';
import MoviesPage from './movies-page';
import Pagination from '../../components/pagination/pagination';

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
});
