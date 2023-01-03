import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

describe('app', () => {
  it('should render', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
