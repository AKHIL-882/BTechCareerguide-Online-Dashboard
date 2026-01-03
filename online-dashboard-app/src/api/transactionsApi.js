import { get } from "./apiConfig";

export const fetchTransactionsApi = (accessToken, params = {}) =>
  get("/transactions", {
    headers: { Authorization: `Bearer ${accessToken}` },
    params,
  });
