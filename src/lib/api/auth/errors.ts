import { TSignupError } from "@/schemas/auth.schema";

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
