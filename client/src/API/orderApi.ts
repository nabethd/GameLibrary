import axios from "axios";
import { ORDER_URL, SERVER_URL } from "../Constants";

export const orderGame = async (gameId: string, customerId: string) => {
  return await axios.post(SERVER_URL + ORDER_URL, {
    gameId,
    customerId,
  });
};

export const closeOrder = async (orderId: string) => {
  return await axios.put(SERVER_URL + ORDER_URL + "/" + orderId);
};

export const getOrders = async () => {
  return await axios.get(SERVER_URL + ORDER_URL);
};
