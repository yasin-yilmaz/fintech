import { refreshAccessToken } from "@/lib/api/auth/actions";
import { createApiClient } from "@/lib/apiClient";
import { API_BASE_URL } from "@/lib/config";

export const apiClientRaw = createApiClient(API_BASE_URL);

export const apiClient = createApiClient(API_BASE_URL, {
  onUnauthorized: async () => {
    const res = await refreshAccessToken();

    if (!res.ok) {
      throw new Error(res.message || "Unauthorized");
    }
  },
  shouldSkipRefresh: ({ path }) => path === "/users/refresh-token",
});
