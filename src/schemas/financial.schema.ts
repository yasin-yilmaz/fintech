import { z } from "zod";

export const apiErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  message: z.string(),
  code: z.string().optional(),
});

export type TApiError = z.infer<typeof apiErrorSchema>;

const trendSchema = z.enum(["up", "down", "flat"]).catch("flat");

// #region summary
const metricSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  change: z.object({
    percentage: z.number(),
    trend: trendSchema,
  }),
});

export const financialSummarySuccessSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    totalBalance: metricSchema,
    totalExpense: metricSchema,
    totalSavings: metricSchema,
    lastUpdated: z.string(),
  }),
});

export type TFinancialSummarySuccess = z.infer<
  typeof financialSummarySuccessSchema
>;
// #endregion summary

// #region working-capital
export const workingCapitalSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    period: z.string(),
    currency: z.string(),
    data: z.array(
      z.object({
        month: z.string(),
        income: z.number(),
        expense: z.number(),
        net: z.number(),
      }),
    ),
    summary: z.object({
      totalIncome: z.number(),
      totalExpense: z.number(),
      netBalance: z.number(),
    }),
  }),
});

export type TWorkingCapitalSuccess = z.infer<
  typeof workingCapitalSuccessSchema
>;

// #endregion working-capital

// #region recent-transactions
export const recentTransactionsSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    transactions: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        business: z.string(),
        image: z.string(),
        type: z.string(),
        amount: z.number(),
        currency: z.string(),
        date: z.string(),
        status: z.string(),
      }),
    ),
    summary: z.object({
      totalIncome: z.number(),
      totalExpense: z.number(),
      count: z.number(),
    }),
  }),
});

export type TRecentTransactionsSuccess = z.infer<
  typeof recentTransactionsSuccessSchema
>;

// #endregion recent-transactions

// #region wallet
export const walletSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    cards: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.string(),
        cardNumber: z.string(),
        bank: z.string(),
        network: z.string(),
        expiryMonth: z.number(),
        expiryYear: z.number(),
        color: z.string(),
        isDefault: z.boolean(),
      }),
    ),
  }),
});

export type TWalletSuccess = z.infer<typeof walletSuccessSchema>;

// #endregion wallet

// #region scheduled-transfers
export const scheduledTransfersSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    transfers: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        image: z.string(),
        date: z.string(),
        amount: z.number(),
        currency: z.string(),
        status: z.string(),
      }),
    ),
    summary: z.object({
      totalScheduledAmount: z.number(),
      count: z.number(),
    }),
  }),
});

export type TScheduledTransfersSuccess = z.infer<
  typeof scheduledTransfersSuccessSchema
>;

// #endregion scheduled-transfers
