import { QueryClient, type VueQueryPluginOptions } from "@tanstack/vue-query";

import { RETRY_TIME, STALE_TIME } from "@/constants";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
      retry: RETRY_TIME,
    },
  },
});

export const vueQueryOptions: VueQueryPluginOptions = {
  queryClient,
};
