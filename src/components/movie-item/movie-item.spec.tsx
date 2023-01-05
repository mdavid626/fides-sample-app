import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  useAddToFavourites,
  useRemoveFromFavourites,
} from '../../hooks/movies-hooks/movies-hooks';
import { movie1 } from '../../test-data/movies';
import MovieItem from './movie-item';

jest.mock('../../hooks/movies-hooks/movies-hooks');

describe('movie-item', () => {
  beforeEach(() => {
    (useAddToFavourites as jest.Mock).mockReturnValue([jest.fn(), false]);
    (useRemoveFromFavourites as jest.Mock).mockReturnValue([jest.fn(), false]);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const { asFragment } = render(<MovieItem movie={movie1} />);
    expect(asFragment()).toMatchSnapshot();
    expect(useAddToFavourites).toHaveBeenCalledWith();
    expect(useRemoveFromFavourites).toHaveBeenCalledWith();
  });

  it('should render remove from favourites button', () => {
    render(<MovieItem movie={movie1} isFavourite />);
    expect(screen.queryByTitle('Add to favourites')).toBe(null);
    expect(screen.getByTitle('Remove from favourites')).toBeVisible();
  });

  it('should add custom className', () => {
    render(<MovieItem movie={movie1} className="myClassName" />);
    expect(screen.getByTestId('MovieItem-76600')).toHaveClass('MovieItem');
    expect(screen.getByTestId('MovieItem-76600')).toHaveClass('myClassName');
  });

  it('should be able to add to favourites', () => {
    const addToFavourites = jest.fn();
    (useAddToFavourites as jest.Mock).mockReturnValue([addToFavourites, false]);
    render(<MovieItem movie={movie1} />);
    userEvent.click(screen.getByTitle('Add to favourites'));
    expect(addToFavourites).toHaveBeenCalledWith(movie1);
  });

  it('should not be able to add to favourites when adding is in progress', () => {
    const addToFavourites = jest.fn();
    (useAddToFavourites as jest.Mock).mockReturnValue([addToFavourites, true]);
    render(<MovieItem movie={movie1} />);
    userEvent.click(screen.getByTitle('Add to favourites'));
    expect(addToFavourites).not.toHaveBeenCalled();
  });

  it('should be able to remove from favourites', () => {
    const removeFromFavourites = jest.fn();
    (useRemoveFromFavourites as jest.Mock).mockReturnValue([
      removeFromFavourites,
      false,
    ]);
    render(<MovieItem movie={movie1} isFavourite />);
    userEvent.click(screen.getByTitle('Remove from favourites'));
    expect(removeFromFavourites).toHaveBeenCalledWith(movie1);
  });

  it('should not be able to remove from favourites when remove is in progress', () => {
    const removeFromFavourites = jest.fn();
    (useRemoveFromFavourites as jest.Mock).mockReturnValue([
      removeFromFavourites,
      true,
    ]);
    render(<MovieItem movie={movie1} isFavourite />);
    userEvent.click(screen.getByTitle('Remove from favourites'));
    expect(removeFromFavourites).not.toHaveBeenCalled();
  });
});
