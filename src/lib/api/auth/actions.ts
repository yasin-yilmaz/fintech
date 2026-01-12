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

export type TAuthFieldError = {
  field: string;
  message: string;
  code?: string;
};

export type TAuthResult<T> =
  | { ok: true; data: T; message?: string }
  | { ok: false; message: string; code?: string; details?: TAuthFieldError[] };

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

const toAuthErrorResult = <TSchema extends z.ZodType<TErrorPayloadBase>>(
  error: unknown,
  schema: TSchema,
  fallbackMessage = "Something went wrong.",
): TAuthResult<never> => {
  if (error instanceof ApiError) {
    const parsed = schema.safeParse(error.payload);

    if (parsed.success) {
      return {
        ok: false,
        message: parsed.data.message ?? error.message,
        code: parsed.data.code,
        details:
          (parsed.data.details as TAuthFieldError[] | undefined) ?? undefined,
      };
    }

    return { ok: false, message: error.message };
  }

  if (error instanceof Error) {
    return { ok: false, message: error.message || fallbackMessage };
  }

  return { ok: false, message: fallbackMessage };
};

export const signup = async (
  body: TSignUpFormValues,
): Promise<TAuthResult<TSignupSuccess>> => {
  const parsedBody = signUpSchema.safeParse(body);

  if (!parsedBody.success) {
    return {
      ok: false,
      message: "Please check your form inputs.",
      code: "VALIDATION_FAILED",
    };
  }

  try {
    const res = await apiClient.post<unknown>(
      "/users/register",
      parsedBody.data,
    );
    const parsed = signupSuccessSchema.parse(res);

    return { ok: true, data: parsed, message: parsed.message };
  } catch (e) {
    return toAuthErrorResult(e, signupErrorSchema);
  }
};

export const signin = async (
  body: TSignInFormValues,
): Promise<TAuthResult<TLoginSuccess>> => {
  const parsedBody = signInSchema.safeParse(body);

  if (!parsedBody.success) {
    return {
      ok: false,
      message: "Please check your form inputs.",
      code: "VALIDATION_FAILED",
    };
  }

  try {
    const res = await apiClient.post<unknown>("/users/login", parsedBody.data);
    const parsed = loginSuccessSchema.parse(res);

    await setAccessTokenCookie(parsed.data.accessToken);

    return { ok: true, data: parsed, message: parsed.message };
  } catch (e) {
    return toAuthErrorResult(e, loginErrorSchema);
  }
};

export const logout = async (): Promise<TAuthResult<TLogoutSuccess>> => {
  const token = await getAccessTokenFromCookie();

  if (!token) {
    await deleteAccessTokenCookie();
    const fallback: TLogoutSuccess = {
      success: true,
      message: "Logged out successfully.",
    };
    return { ok: true, data: fallback, message: fallback.message };
  }

  try {
    const res = await apiClient.post<unknown>("/users/logout", undefined, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const parsed = logoutSuccessSchema.parse(res);

    await deleteAccessTokenCookie();

    return { ok: true, data: parsed, message: parsed.message };
  } catch (e) {
    return toAuthErrorResult(e, logoutErrorSchema);
  }
};

export const getProfile = async (): Promise<TAuthResult<TProfileSuccess>> => {
  const token = await getAccessTokenFromCookie();

  if (!token) {
    return {
      ok: false,
      message: "An access token is required for authentication.",
      code: "TOKEN_MISSING",
    };
  }

  try {
    const res = await apiClient.get<unknown>("/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const parsed = profileSuccessSchema.parse(res);
    return { ok: true, data: parsed };
  } catch (e) {
    return toAuthErrorResult(e, profileErrorSchema);
  }
};

export const refreshAccessToken = async (): Promise<
  TAuthResult<TRefreshSuccess>
> => {
  const token = await getAccessTokenFromCookie();

  if (!token) {
    return {
      ok: false,
      message: "An access token is required for authentication.",
      code: "TOKEN_MISSING",
    };
  }

  try {
    const res = await apiClientRaw.post<unknown>(
      "/users/refresh-token",
      undefined,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const parsed = refreshSuccessSchema.parse(res);

    await setAccessTokenCookie(parsed.data.accessToken);

    return { ok: true, data: parsed, message: parsed.message };
  } catch (e) {
    return toAuthErrorResult(e, refreshErrorSchema, "Token refresh failed.");
  }
};
