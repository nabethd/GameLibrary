import axios from "axios";
import { ORDER_URL, SERVER_URL } from "../Constants";

export const orderGame = async (gameId: string, customerId: string) => {
  return await axios.post(SERVER_URL + ORDER_URL, {
    gameId,
    customerId,
  });
};
