import React from 'react';
import Header from './header';
import { renderWithRouter } from '../../testing-library/render';

describe('header', () => {
  it('should render', () => {
    const { asFragment } = renderWithRouter(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
