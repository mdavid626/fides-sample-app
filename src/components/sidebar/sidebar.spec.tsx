import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './sidebar';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';

const renderWithRouter = (component: JSX.Element) =>
  render(component, {
    wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
  });

describe('sidebar', () => {
  it('should render', () => {
    const { asFragment } = renderWithRouter(<Sidebar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
