import Axios, { AxiosResponse } from "axios";
import applyConverters from "axios-case-converter";
import {
  PaginatedQueryResult,
  QueryResult,
  usePaginatedQuery,
  useQuery,
} from "react-query";
import { events } from "./api/events";
import { pages } from "./api/pages";
import { medias } from "./api/medias";
import { transactions } from "./api/transactions";
import { marketplace } from "./api/marketplace";
import { products } from "./api/products";
import { polls } from "./api/polls";
import { associations } from "./api/associations";
import { tags } from "./api/tags";
import { namespaces } from "./api/namespaces";
import { jwt } from "./api/jwt";
import { users } from "./api/users";
import { fundings } from "./api/fundings";
import { profile } from "./api/profile";
import { courses } from "./api/courses";
import { roles } from "./api/roles";
import { loanables } from "./api/library/loanables";
import { loans } from "./api/library/loans";
import { elections } from "./api/elections";
import { subscriptions } from "./api/subscriptions";
import { library } from "./api/library/library";

export const baseUrl = "http://localhost:8000";
const baseApi = baseUrl + "/api/v1";

export const apiService = applyConverters(
  Axios.create({
    withCredentials: true,
    baseURL: baseApi,
  })
);

/**
 * Add a callback function to the promise, called on success, which returns the `data` of the `AxiosResponse`.
 */
export function unwrap<T>(promise): Promise<T> {
  return promise.then((response: AxiosResponse<T>) => {
    return response.data;
  });
}

export const api = {
  associations: associations,
  medias: medias,
  pages: pages,

  events: events,

  library: library,
  loanables: loanables,
  loans: loans,

  marketplace: marketplace,
  products: products,
  transactions: transactions,
  fundings: fundings,

  elections: elections,

  roles: roles,

  courses: courses,
  polls: polls,

  tags: tags,
  namespaces: namespaces,

  jwt: jwt,
  users: users,
  profile: profile,
  subscriptions: subscriptions,
};

/**
 * The same as [`useQuery`](https://github.com/tannerlinsley/react-query), but remove the first element of `key` before passing it to `fetchFunction`.
 *
 * This function should be used for non-mutating queries (such as `GET`). Otherwise, use `useMutation`.
 *
 * Example:
 *
 * ```
 * // Somewhere in `components/`.
 *
 * const { status, data, error } = useBetterQuery(
 *     ["polls", 1],
 *     api.polls.get,
 *     { refetchOnWindowFocus: false }
 * )
 *
 * if (status === "loading") {
 *     ...
 * } else if (status === "error") {
 *     ...
 * } else if (status === "success" && data) {
 *     ...
 * }
 *
 * // Somewhere in `services/api/`.
 *
 * api.polls = {
 *     get: id => apiService.get(...)
 * }
 * ```
 *
 * @param key The request key. Should be a non-empty array which first element is a string or `false` if you don't want `fetchFunction` to be called (useful for conditional queries, because hooks should be used in conditions).
 * @param fetchFunction The function to call. It will be given the elements of `key` (except its first) as arguments.
 * @param config An optional object to configure `useQuery`.
 * @return an object `{ status, data, error }`.
 */
export function useBetterQuery<T>(
  key: false | any[],
  fetchFunction: (...params: any) => any,
  config?: any
): QueryResult<T> {
  return useQuery<T, any, any>(
    key,
    (_, ...params) => fetchFunction(...params),
    config
  );
}

export type PaginatedResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T;
};

/**
 * The same as [`usePaginatedQuery`](https://github.com/tannerlinsley/react-query), but remove the first element of `key` before passing it to `fetchFunction`.
 *
 * This function should be used for non-mutating queries (such as `GET`). Otherwise, use `useBetterMutation`.
 * Also, it should not be used directly but in a `Pagination` component.
 *
 * @param key The request key. Should be a non-empty array which first element is a string or `false` if you don't want `fetchFunction` to be called (useful for conditional queries, because hooks should be used in conditions).
 * @param fetchFunction The function to call. It will be given the elements of `key` (except its first) as arguments.
 * @param config An optional object to configure `usePaginatedQuery`.
 * @return an object `{ status, data, error }`.
 */
export function useBetterPaginatedQuery<T>(
  key: false | any[],
  fetchFunction: (...params: any) => any,
  config?: any
): PaginatedQueryResult<T> {
  return usePaginatedQuery<T, any, any>(
    key,
    (_, ...params) => {
      return fetchFunction(...params);
    },
    config
  );
}
