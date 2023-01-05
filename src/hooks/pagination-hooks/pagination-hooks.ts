import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const usePagination = (): [number, () => void, () => void] => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = useMemo(() => {
    const query = new URLSearchParams(location.search);
    const currentPage = Number.parseInt(query.get('page')!, 10) || 1;
    return Math.min(Math.max(currentPage, 1), 7);
  }, [location.search]);

  const goNext = useCallback(() => {
    const query = new URLSearchParams(location.search);
    query.set('page', (currentPage + 1).toString());
    navigate(
      {
        search: query.toString(),
      },
      { replace: true }
    );
  }, [location.search, currentPage, navigate]);

  const goPrevious = useCallback(() => {
    const query = new URLSearchParams(location.search);
    query.set('page', (currentPage - 1).toString());
    navigate(
      {
        search: query.toString(),
      },
      { replace: true }
    );
  }, [location.search, currentPage, navigate]);

  return [currentPage, goNext, goPrevious];
};
