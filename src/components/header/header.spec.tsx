import React from 'react';
import { renderWithRouter } from '../../testing-library/render';
import Header from './header';

describe('header', () => {
  it('should render', () => {
    const { asFragment } = renderWithRouter(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
