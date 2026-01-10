"use server";

import { cookies } from "next/headers";

import { apiClient } from "@/lib/api";
import { ApiError } from "@/lib/apiClient";

import {
  loginErrorSchema,
  loginSuccessSchema,
  signInSchema,
  signupErrorSchema,
  signUpSchema,
  signupSuccessSchema,
  TLoginSuccess,
  TSignInFormValues,
  TSignupError,
  TSignUpFormValues,
  TSignupSuccess,
} from "@/schemas/auth.schema";

export class AuthApiError extends Error {
  code?: string;
  details?: TSignupError["details"];

  constructor(
    message: string,
    args?: { code?: string; details?: TSignupError["details"] },
  ) {
    super(message);
    this.name = "AuthApiError";
    this.code = args?.code;
    this.details = args?.details;
  }
}

const ACCESS_TOKEN_COOKIE = "ACCESS_TOKEN";

export const authApi = {
  signup: async (body: TSignUpFormValues): Promise<TSignupSuccess> => {
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
  },

  signin: async (body: TSignInFormValues): Promise<TLoginSuccess> => {
    const parsedBody = signInSchema.parse(body);

    try {
      const res = await apiClient.post<unknown>("/users/login", parsedBody);
      const parsed = loginSuccessSchema.parse(res);

      const token = parsed.data.accessToken;
      const cookieStore = await cookies();

      cookieStore.set({
        name: ACCESS_TOKEN_COOKIE,
        value: token,
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
  },
} as const;
