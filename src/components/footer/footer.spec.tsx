import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Footer from './footer';

describe('footer', () => {
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
