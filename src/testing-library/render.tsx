import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render } from '@testing-library/react';

export const renderWithRouter = (component: JSX.Element) => {
  const router = {} as { current?: ReturnType<typeof createBrowserRouter> };
  return {
    ...render(component, {
      wrapper: ({ children }) => {
        const browserRouter = createBrowserRouter([
          {
            path: '',
            element: children,
          },
        ]);
        router.current = browserRouter;
        return <RouterProvider router={browserRouter} />;
      },
    }),
    router,
  };
};
