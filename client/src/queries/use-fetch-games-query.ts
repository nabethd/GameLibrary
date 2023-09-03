import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-client";
import { GameData } from "../types";
import { getGames } from "../API/gameApi";

const useFetchGamesQuery = () =>
  useQuery<GameData[]>(QUERY_KEYS.games, async () => (await getGames()).data, {
    staleTime: Infinity,
  });

export default useFetchGamesQuery;
