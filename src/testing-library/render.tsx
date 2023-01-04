import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render } from '@testing-library/react';

export const renderWithRouter = (component: JSX.Element) => {
  const router = {} as { current?: ReturnType<typeof createMemoryRouter> };
  return {
    ...render(component, {
      wrapper: ({ children }) => {
        const memoryRouter = createMemoryRouter([
          {
            path: '',
            element: children,
          },
        ]);
        router.current = memoryRouter;
        return <RouterProvider router={memoryRouter} />;
      },
    }),
    router,
  };
};