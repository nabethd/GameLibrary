import { QueryCache, QueryClient } from "@tanstack/react-query";

export const QUERY_KEYS = {
  customers: (keyword: string) => ["customers", keyword],
  game: (gameId: string) => ["game", gameId],
  games: ["games"],
  orders: ["orders"],
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retryOnMount: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({}),
});

export default queryClient;
