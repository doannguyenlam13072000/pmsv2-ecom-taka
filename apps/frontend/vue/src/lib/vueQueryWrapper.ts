import {
  type QueryKey,
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/vue-query";

import { RETRY_TIME, STALE_TIME } from "@/constants";

export function useAppQuery<TData, TError = unknown>(
  options: Omit<UseQueryOptions<TData, TError, TData, QueryKey>, "queryKey"> & {
    queryKey: QueryKey;
  },
) {
  return useQuery({
    staleTime: STALE_TIME,
    retry: RETRY_TIME,
    refetchOnWindowFocus: false,
    ...options,
  });
}

export function useAppMutation<TData = unknown, TError = unknown, TVariables = void>(
  options: UseMutationOptions<TData, TError, TVariables>,
) {
  return useMutation(options);
}
