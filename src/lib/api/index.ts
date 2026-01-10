import { refreshAccessToken } from "@/lib/api/auth/actions";
import { createApiClient } from "@/lib/apiClient";
import { API_BASE_URL } from "@/lib/config";

export const apiClientRaw = createApiClient(API_BASE_URL);

export const apiClient = createApiClient(API_BASE_URL, {
  onUnauthorized: async () => {
    await refreshAccessToken();
  },
  shouldSkipRefresh: ({ path }) => path === "/users/refresh-token",
});
