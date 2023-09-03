import { useQuery } from "@tanstack/react-query";
import { findCustomers } from "../API/customerApi";
import { QUERY_KEYS } from "./query-client";
import { CustomerData } from "../types";

const useFetchCustomersQuery = (keyword = "") =>
  useQuery<CustomerData[]>(
    QUERY_KEYS.customers(keyword),
    async () => (await findCustomers(keyword)).data,
    {
      staleTime: Infinity,
    }
  );

export default useFetchCustomersQuery;
