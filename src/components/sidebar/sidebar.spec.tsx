import React from 'react';
import Sidebar from './sidebar';
import { renderWithRouter } from '../../testing-library/render';

describe('sidebar', () => {
  it('should render', () => {
    const { asFragment } = renderWithRouter(<Sidebar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
