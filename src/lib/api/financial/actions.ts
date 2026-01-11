"use server";

import { cookies } from "next/headers";
import type { z } from "zod";

import { apiClient } from "@/lib/api";
import { AuthApiError } from "@/lib/api/auth/errors";
import { ApiError } from "@/lib/apiClient";

import {
  apiErrorSchema,
  financialSummarySuccessSchema,
  recentTransactionsSuccessSchema,
  scheduledTransfersSuccessSchema,
  walletSuccessSchema,
  workingCapitalSuccessSchema,
  type TFinancialSummarySuccess,
  type TRecentTransactionsSuccess,
  type TScheduledTransfersSuccess,
  type TWalletSuccess,
  type TWorkingCapitalSuccess,
} from "@/schemas/financial.schema";

const ACCESS_TOKEN_COOKIE = "ACCESS_TOKEN";

/** ----- cookie helper ----- */
const getAccessTokenFromCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
};

/** ----- shared error helper (same pattern) ----- */
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

/** ----- tiny auth guard ----- */
const requireToken = async () => {
  const token = await getAccessTokenFromCookie();
  if (!token) {
    throw new AuthApiError("An access token is required for authentication.", {
      code: "TOKEN_MISSING",
    });
  }
  return token;
};

/** ----- actions ----- */

export const getFinancialSummary =
  async (): Promise<TFinancialSummarySuccess> => {
    const token = await requireToken();

    try {
      const res = await apiClient.get<unknown>("/financial/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return financialSummarySuccessSchema.parse(res);
    } catch (e) {
      return handleApiError(e, apiErrorSchema);
    }
  };

export const getWorkingCapital = async (): Promise<TWorkingCapitalSuccess> => {
  const token = await requireToken();

  try {
    const res = await apiClient.get<unknown>("/financial/working-capital", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return workingCapitalSuccessSchema.parse(res);
  } catch (e) {
    return handleApiError(e, apiErrorSchema);
  }
};

export const getRecentTransactions = async (
  limit = 20,
): Promise<TRecentTransactionsSuccess> => {
  const token = await requireToken();

  try {
    const res = await apiClient.get<unknown>("/financial/transactions/recent", {
      params: { limit },
      headers: { Authorization: `Bearer ${token}` },
    });

    return recentTransactionsSuccessSchema.parse(res);
  } catch (e) {
    return handleApiError(e, apiErrorSchema);
  }
};

export const getWallet = async (): Promise<TWalletSuccess> => {
  const token = await requireToken();

  try {
    const res = await apiClient.get<unknown>("/financial/wallet", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return walletSuccessSchema.parse(res);
  } catch (e) {
    return handleApiError(e, apiErrorSchema);
  }
};

export const getScheduledTransfers =
  async (): Promise<TScheduledTransfersSuccess> => {
    const token = await requireToken();

    try {
      const res = await apiClient.get<unknown>(
        "/financial/transfers/scheduled",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return scheduledTransfersSuccessSchema.parse(res);
    } catch (e) {
      return handleApiError(e, apiErrorSchema);
    }
  };
