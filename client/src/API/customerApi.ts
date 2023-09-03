import axios from "axios";
import { CUSTOMER_URL, SERVER_URL } from "../Constants";

export const findCustomers = async (keyword: string) => {
  return await axios.get(SERVER_URL + CUSTOMER_URL, {
    params: { keyword },
  });
};
