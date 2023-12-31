import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderGame } from "../API/orderApi";
import { QUERY_KEYS } from "../queries/query-client";
import useFetchGamesQuery from "../queries/use-fetch-games-query";
import useFetchOrdersQuery from "../queries/use-fetch-orders-query";
import useFetchCustomersQuery from "../queries/use-fetch-customers-query";

const useOrderGameMutation = () => {
  const queryClient = useQueryClient();
  const { data: games = [] } = useFetchGamesQuery();
  const { data: orders = [] } = useFetchOrdersQuery();
  const { data: customers = [] } = useFetchCustomersQuery();

  return useMutation(
    async ({ gameId, customerId }: { gameId: string; customerId: string }) => {
      const result = await orderGame(gameId, customerId);
      return result.data;
    },
    {
      onSuccess: async (data) => {
        // Update the games data in the cache
        queryClient.setQueryData(QUERY_KEYS.games, () => {
          return games.map((game) => {
            const { availableCopies } = game;
            return game.id === data.gameId
              ? { ...game, availableCopies: availableCopies - 1 }
              : game;
          });
        });

        await queryClient.refetchQueries(QUERY_KEYS.orders);
      },
    }
  );
};

export default useOrderGameMutation;
