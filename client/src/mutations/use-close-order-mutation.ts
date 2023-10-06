import { useMutation, useQueryClient } from "@tanstack/react-query";
import { closeOrder } from "../API/orderApi";
import { QUERY_KEYS } from "../queries/query-client";
import useFetchGamesQuery from "../queries/use-fetch-games-query";
import useFetchOrdersQuery from "../queries/use-fetch-orders-query";
import { Status } from "../types";

const useCloseOrderMutation = () => {
  const queryClient = useQueryClient();
  const { data: games = [] } = useFetchGamesQuery();
  const { data: orders = [] } = useFetchOrdersQuery();

  return useMutation(
    async ({ orderId }: { orderId: string; gameId: string }) => {
      const result = await closeOrder(orderId);
      return result.data;
    },
    {
      onSuccess: (data, variables) => {
        // Update the games data in the cache
        queryClient.setQueryData(QUERY_KEYS.games, () => {
          return games.map((game) => {
            const { availableCopies } = game;
            return game.id === variables.gameId
              ? { ...game, availableCopies: availableCopies + 1 }
              : game;
          });
        });
        queryClient.setQueryData(QUERY_KEYS.orders, () => {
          return orders.map((order) => {
            return order.id === variables.orderId
              ? { ...order, status: Status.Returned, returnedDate: Date.now() }
              : order;
          });
        });
      },
    }
  );
};

export default useCloseOrderMutation;
