import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from './error-boundary';

describe('error-boundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockReturnValue(undefined);
  });

  it('should render', () => {
    const { asFragment } = render(
      <ErrorBoundary>
        <div>content</div>
      </ErrorBoundary>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should show error page', () => {
    const Component = () => {
      throw new Error('test error');
    };
    const { asFragment } = render(
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(console.error).toHaveBeenCalled();
  });
});
