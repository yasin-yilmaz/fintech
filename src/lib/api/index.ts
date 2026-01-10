import { createApiClient } from "@/lib/apiClient";
import { API_BASE_URL } from "@/lib/config";

export const apiClient = createApiClient(API_BASE_URL);
