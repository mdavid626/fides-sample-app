import React, { ReactElement } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { InitialEntry } from '@remix-run/router';
import {
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from '@testing-library/react';
import { queries, Queries } from '@testing-library/dom';

export const renderWithRouter = (
  component: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => {
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
      ...options,
    }),
    router,
  };
};

export const renderHookWithQueryClient = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false,
        staleTime: 0,
      },
    },
  });
  return {
    ...renderHook(render, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
      ...options,
    }),
    queryClient,
  };
};

export const renderHookWithRouter = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>,
  initialEntries?: InitialEntry[]
) => {
  const router = {} as { current?: ReturnType<typeof createMemoryRouter> };
  return {
    ...renderHook(render, {
      wrapper: ({ children }) => {
        const memoryRouter = createMemoryRouter(
          [
            {
              path: '',
              element: children,
            },
          ],
          { initialEntries }
        );
        router.current = memoryRouter;
        return <RouterProvider router={memoryRouter} />;
      },
      ...options,
    }),
    router,
  };
};
