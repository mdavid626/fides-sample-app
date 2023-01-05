import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './pagination';

describe('pagination', () => {
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const { asFragment } = render(
      <Pagination
        currentPage={3}
        numberOfPages={7}
        goNext={jest.fn()}
        goPrevious={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should be able to go to previous page', () => {
    const goPrevious = jest.fn();
    render(
      <Pagination
        currentPage={2}
        numberOfPages={7}
        goNext={jest.fn()}
        goPrevious={goPrevious}
      />
    );
    userEvent.click(screen.getByTitle('Go to previous page'));
    expect(goPrevious).toHaveBeenCalledWith();
  });

  it('should be able to go to next page', () => {
    const goNext = jest.fn();
    render(
      <Pagination
        currentPage={2}
        numberOfPages={7}
        goNext={goNext}
        goPrevious={jest.fn()}
      />
    );
    userEvent.click(screen.getByTitle('Go to next page'));
    expect(goNext).toHaveBeenCalledWith();
  });

  it('should not be able to go to previous page when on first page', () => {
    render(
      <Pagination
        currentPage={1}
        numberOfPages={7}
        goNext={jest.fn()}
        goPrevious={jest.fn()}
      />
    );
    expect(screen.queryByTitle('Go to previous page')).toBe(null);
    expect(screen.getByTitle('Go to next page')).toBeVisible();
  });

  it('should not be able to go to next page when on last page', () => {
    render(
      <Pagination
        currentPage={7}
        numberOfPages={7}
        goNext={jest.fn()}
        goPrevious={jest.fn()}
      />
    );
    expect(screen.queryByTitle('Go to next page')).toBe(null);
    expect(screen.getByTitle('Go to previous page')).toBeVisible();
  });
});
