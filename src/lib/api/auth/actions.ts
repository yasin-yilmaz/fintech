"use server";

import { cookies } from "next/headers";
import type { z } from "zod";

import { apiClient, apiClientRaw } from "@/lib/api";
import { ApiError } from "@/lib/apiClient";

import {
  loginErrorSchema,
  loginSuccessSchema,
  logoutErrorSchema,
  logoutSuccessSchema,
  profileErrorSchema,
  profileSuccessSchema,
  refreshErrorSchema,
  refreshSuccessSchema,
  signInSchema,
  signupErrorSchema,
  signUpSchema,
  signupSuccessSchema,
  type TLoginSuccess,
  type TLogoutSuccess,
  type TProfileSuccess,
  type TRefreshSuccess,
  type TSignInFormValues,
  type TSignUpFormValues,
  type TSignupSuccess,
} from "@/schemas/auth.schema";

import { AuthApiError } from "./errors";

const ACCESS_TOKEN_COOKIE = "ACCESS_TOKEN";

const setAccessTokenCookie = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: ACCESS_TOKEN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
};

const getAccessTokenFromCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
};

const deleteAccessTokenCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
};

type TErrorPayloadBase = {
  message?: string;
  code?: string;
  details?: unknown;
};

const throwAuthApiErrorFrom = <TSchema extends z.ZodType<TErrorPayloadBase>>(
  err: ApiError,
  schema: TSchema,
): never => {
  const parsed = schema.safeParse(err.payload);

  if (parsed.success) {
    throw new AuthApiError(parsed.data.message ?? err.message, {
      code: parsed.data.code,
      details: parsed.data.details as {
        field: string;
        message: string;
        code?: string | undefined;
      }[],
    });
  }

  throw new AuthApiError(err.message);
};

const handleApiError = <TSchema extends z.ZodType<TErrorPayloadBase>>(
  error: unknown,
  schema: TSchema,
): never => {
  if (error instanceof ApiError) return throwAuthApiErrorFrom(error, schema);
  throw new AuthApiError("Something went wrong.");
};

export const signup = async (
  body: TSignUpFormValues,
): Promise<TSignupSuccess> => {
  const parsedBody = signUpSchema.parse(body);

  try {
    const res = await apiClient.post<unknown>("/users/register", parsedBody);
    const parsed = signupSuccessSchema.parse(res);
    return parsed;
  } catch (e) {
    return handleApiError(e, signupErrorSchema);
  }
};

export const signin = async (
  body: TSignInFormValues,
): Promise<TLoginSuccess> => {
  const parsedBody = signInSchema.parse(body);

  try {
    const res = await apiClient.post<unknown>("/users/login", parsedBody);
    const parsed = loginSuccessSchema.parse(res);

    await setAccessTokenCookie(parsed.data.accessToken);

    return parsed;
  } catch (e) {
    return handleApiError(e, loginErrorSchema);
  }
};

export const logout = async (): Promise<TLogoutSuccess> => {
  const token = await getAccessTokenFromCookie();

  if (!token) {
    await deleteAccessTokenCookie();
    const fallback: TLogoutSuccess = {
      success: true,
      message: "Logged out successfully.",
    };
    return fallback;
  }

  try {
    const res = await apiClient.post<unknown>("/users/logout", undefined, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const parsed = logoutSuccessSchema.parse(res);

    await deleteAccessTokenCookie();

    return parsed;
  } catch (e) {
    if (e instanceof ApiError)
      return throwAuthApiErrorFrom(e, logoutErrorSchema);
    throw new AuthApiError("Something went wrong.");
  }
};

export const getProfile = async (): Promise<TProfileSuccess> => {
  const token = await getAccessTokenFromCookie();

  if (!token) {
    throw new AuthApiError("An access token is required for authentication.", {
      code: "TOKEN_MISSING",
    });
  }

  try {
    const res = await apiClient.get<unknown>("/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const parsed = profileSuccessSchema.parse(res);
    return parsed;
  } catch (e) {
    if (e instanceof ApiError)
      return throwAuthApiErrorFrom(e, profileErrorSchema);
    throw new AuthApiError("Something went wrong.");
  }
};

export const refreshAccessToken = async (): Promise<TRefreshSuccess> => {
  const token = await getAccessTokenFromCookie();

  if (!token) {
    throw new AuthApiError("An access token is required for authentication.", {
      code: "TOKEN_MISSING",
    });
  }

  try {
    const res = await apiClientRaw.post<unknown>(
      "/users/refresh-token",
      undefined,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const parsed = refreshSuccessSchema.parse(res);

    await setAccessTokenCookie(parsed.data.accessToken);

    return parsed;
  } catch (e) {
    if (e instanceof ApiError)
      return throwAuthApiErrorFrom(e, refreshErrorSchema);
    throw new AuthApiError("Token refresh failed.");
  }
};
