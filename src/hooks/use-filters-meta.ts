import { useQueryState } from 'nuqs';

export function useFiltersMeta() {
  const [limit, setLimit] = useQueryState('limit');
  const [page, setPage] = useQueryState('page');

  const reset = () => {
    setLimit('10');
    setPage('1');
  };

  const setLimitValue = (limitValue: number) => {
    setLimit(String(limitValue));
    setPage('1');
  };
  const setPageValue = (pageValue: number) => {
    setPage(String(pageValue));
  };

  return {
    limit: Number(limit),
    setLimit: setLimitValue,
    page: Number(page),
    setPage: setPageValue,
    reset,
  };
}
