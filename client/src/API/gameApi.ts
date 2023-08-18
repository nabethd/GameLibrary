import axios from "axios";
import { GAME_URL, SERVER_URL } from "../Constants";
import { GameData } from "../types";

export const createGame = async (newGame: Partial<GameData>) => {
  return await axios.post(SERVER_URL + GAME_URL, newGame);
};

export const updateGame = async (game: Partial<GameData>) => {
  return await axios.put(SERVER_URL + GAME_URL + `/${game.id}`, game);
};

export const getGames = async () => {
  return await axios.get(SERVER_URL + GAME_URL);
};

export const findGame = async (gameId: string) => {
  return await axios.get(SERVER_URL + GAME_URL + `/${gameId}`);
};
