import { apiClient } from "@/lib/api";
import { ApiError } from "@/lib/apiClient";

import {
  signupErrorSchema,
  signUpSchema,
  signupSuccessSchema,
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
    this.name = "UserApiError";
    this.code = args?.code;
    this.details = args?.details;
  }
}

export const authApi = {
  signup: async (body: TSignUpFormValues): Promise<TSignupSuccess> => {
    const parsedBody = signUpSchema.parse(body);

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
} as const;
