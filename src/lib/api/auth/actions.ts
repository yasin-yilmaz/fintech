"use server";

import { cookies } from "next/headers";

import { apiClient } from "@/lib/api";
import { ApiError } from "@/lib/apiClient";

import {
  loginErrorSchema,
  loginSuccessSchema,
  logoutErrorSchema,
  logoutSuccessSchema,
  signInSchema,
  signupErrorSchema,
  signUpSchema,
  signupSuccessSchema,
  TLoginSuccess,
  TLogoutSuccess,
  TSignInFormValues,
  TSignUpFormValues,
  TSignupSuccess,
} from "@/schemas/auth.schema";

import { AuthApiError } from "./errors";

const ACCESS_TOKEN_COOKIE = "ACCESS_TOKEN";

export const signup = async (
  body: TSignUpFormValues,
): Promise<TSignupSuccess> => {
  const parsedBody = signUpSchema.parse(body);

  console.log(parsedBody);

  try {
    const res = await apiClient.post<unknown>("/users/register", parsedBody);
    return signupSuccessSchema.parse(res);
  } catch (e) {
    if (e instanceof ApiError) {
      const parsed = signupErrorSchema.safeParse(e.payload);
      if (parsed.success) {
        throw new AuthApiError(parsed.data.message ?? e.message, {
          code: parsed.data.code,
          details: parsed.data.details,
        });
      }
      throw new AuthApiError(e.message);
    }
    throw new AuthApiError("Something went wrong.");
  }
};

export const signin = async (
  body: TSignInFormValues,
): Promise<TLoginSuccess> => {
  const parsedBody = signInSchema.parse(body);

  try {
    const res = await apiClient.post<unknown>("/users/login", parsedBody);
    const parsed = loginSuccessSchema.parse(res);

    const cookieStore = await cookies();
    cookieStore.set({
      name: ACCESS_TOKEN_COOKIE,
      value: parsed.data.accessToken,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return parsed;
  } catch (e) {
    if (e instanceof ApiError) {
      const parsed = loginErrorSchema.safeParse(e.payload);
      if (parsed.success) {
        throw new AuthApiError(parsed.data.message ?? e.message, {
          code: parsed.data.code,
          details: parsed.data.details,
        });
      }
      throw new AuthApiError(e.message);
    }
    throw new AuthApiError("Something went wrong.");
  }
};

export const logout = async (): Promise<TLogoutSuccess> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!token) {
    cookieStore.delete(ACCESS_TOKEN_COOKIE);
    return { success: true, message: "Logged out successfully." };
  }

  try {
    const res = await apiClient.post<unknown>("/users/logout", undefined, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const parsed = logoutSuccessSchema.parse(res);

    cookieStore.delete(ACCESS_TOKEN_COOKIE);

    return parsed;
  } catch (e) {
    if (e instanceof ApiError) {
      const parsedErr = logoutErrorSchema.safeParse(e.payload);
      if (parsedErr.success) {
        throw new AuthApiError(parsedErr.data.message ?? e.message, {
          code: parsedErr.data.code,
        });
      }
      throw new AuthApiError(e.message);
    }

    throw new AuthApiError("Something went wrong.");
  }
};
