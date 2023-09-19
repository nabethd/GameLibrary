import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-client";
import { EnrichedOrdersData, OrdersData } from "../types";
import { getOrders } from "../API/orderApi";
import useFetchGamesQuery from "./use-fetch-games-query";
import useFetchCustomersQuery from "./use-fetch-customers-query";

const useFetchOrdersQuery = () => {
  const { data: games = [], isLoading: isGamesLoading } = useFetchGamesQuery();
  const { data: customers = [], isLoading: isCustomerLoading } =
    useFetchCustomersQuery();

  return useQuery<EnrichedOrdersData[]>(
    QUERY_KEYS.orders,
    async () => {
      const orders: OrdersData[] = (await getOrders()).data;

        return orders.map((order) => {
        const game = games.find((game) => game.id === order.gameId);
        const customer = customers.find(
          (customer) => customer.id === order.customerId
        );

        return {
          ...order,
          game: game,
          customer: customer,
        };
      });

    },
    {
      enabled: !isGamesLoading && !isCustomerLoading,
      staleTime: Infinity,
    }
  );
};

export default useFetchOrdersQuery;
