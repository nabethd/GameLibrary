import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-client";
import { GameData } from "../types";
import { findGame } from "../API/gameApi";

const useFetchGameQuery = (gameId = "") =>
  useQuery<GameData>(
    QUERY_KEYS.game(gameId),
    async () => (await findGame(gameId)).data,
    {
      enabled: !!gameId,
      staleTime: Infinity,
    }
  );

export default useFetchGameQuery;
