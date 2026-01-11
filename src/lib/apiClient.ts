type THttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class ApiError extends Error {
  status: number;
  url: string;
  payload?: unknown;

  constructor(args: {
    status: number;
    url: string;
    message: string;
    payload?: unknown;
  }) {
    super(args.message);
    this.name = "ApiError";
    this.status = args.status;
    this.url = args.url;
    this.payload = args.payload;
  }
}

type TRequestOptions = Omit<RequestInit, "method" | "body"> & {
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: unknown;
};

type TApiClientConfig = {
  onUnauthorized?: (args: {
    url: string;
    path: string;
    method: THttpMethod;
  }) => Promise<void>;

  shouldSkipRefresh?: (args: {
    path: string;
    url: string;
    method: THttpMethod;
  }) => boolean;
};

const buildUrl = (
  baseUrl: string,
  path: string,
  params?: TRequestOptions["params"],
) => {
  const base = baseUrl.replace(/\/+$/, "");
  const p = path.replace(/^\/+/, "");
  const url = new URL(`${base}/${p}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};

const isJson = (res: Response) => {
  const ct = res.headers.get("content-type") ?? "";
  return ct.includes("application/json");
};

const readPayload = async (res: Response): Promise<unknown> => {
  if (res.status === 204) return undefined;
  if (isJson(res)) return res.json();
  return res.text();
};

const getErrorMessage = (status: number, payload: unknown) => {
  const fallback = `Request failed (${status})`;

  if (payload && typeof payload === "object" && "message" in payload) {
    const maybeMsg = payload.message;
    return String(maybeMsg ?? fallback);
  }

  return fallback;
};

const request = async <T>(args: {
  baseUrl: string;
  method: THttpMethod;
  path: string;
  options?: TRequestOptions;
  config?: TApiClientConfig;
  attempt?: number;
}): Promise<T> => {
  const { baseUrl, method, path, options, config } = args;
  const attempt = args.attempt ?? 0;

  const { params, body, headers, ...init } = options ?? {};
  const url = buildUrl(baseUrl, path, params);

  const res = await fetch(url, {
    method,
    ...init,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : null),
      ...(headers ?? {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await readPayload(res);

  if (
    res.status === 401 &&
    attempt === 0 &&
    config?.onUnauthorized &&
    !config?.shouldSkipRefresh?.({ path, url, method })
  ) {
    try {
      await config.onUnauthorized({ url, path, method });

      return request<T>({
        baseUrl,
        method,
        path,
        options,
        config,
        attempt: 1,
      });
    } catch {}
  }

  if (!res.ok) {
    const msg = getErrorMessage(res.status, payload);
    throw new ApiError({ status: res.status, url, message: msg, payload });
  }

  return payload as T;
};

export const createApiClient = (baseUrl: string, config?: TApiClientConfig) => {
  return {
    get: <T>(path: string, options?: TRequestOptions) =>
      request<T>({ baseUrl, method: "GET", path, options, config }),

    post: <T>(path: string, body?: unknown, options?: TRequestOptions) =>
      request<T>({
        baseUrl,
        method: "POST",
        path,
        options: { ...(options ?? {}), body },
        config,
      }),

    put: <T>(path: string, body?: unknown, options?: TRequestOptions) =>
      request<T>({
        baseUrl,
        method: "PUT",
        path,
        options: { ...(options ?? {}), body },
        config,
      }),

    patch: <T>(path: string, body?: unknown, options?: TRequestOptions) =>
      request<T>({
        baseUrl,
        method: "PATCH",
        path,
        options: { ...(options ?? {}), body },
        config,
      }),

    del: <T>(path: string, options?: TRequestOptions) =>
      request<T>({ baseUrl, method: "DELETE", path, options, config }),
  } as const;
};
