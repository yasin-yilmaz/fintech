export type TCurrencyCode = "TRY" | "USD" | "EUR" | "GBP" | string;
export type TTrend = "up" | "down" | "flat";
export type TStatus = "completed" | "pending" | "scheduled" | "failed" | string;

export type TApiSuccessResponse<TData> = {
  success: true;
  message: string;
  data: TData;
};

export type TApiErrorResponse = {
  success: false;
  error: string;
  message: string;
  code: string;
};

export type TApiDataWithSummary<
  TMain,
  TSummary = never,
> = TSummary extends never ? TMain : TMain & { summary: TSummary };

export type TApiResponse<TData> =
  | TApiSuccessResponse<TData>
  | TApiErrorResponse;

export type TFinancialSummaryMetric = {
  amount: number;
  currency: TCurrencyCode;
  change: {
    percentage: number;
    trend: TTrend;
  };
};

export type TFinancialSummaryData = {
  totalBalance: TFinancialSummaryMetric;
  totalExpense: TFinancialSummaryMetric;
  totalSavings: TFinancialSummaryMetric;
  lastUpdated: string;
};

export type TFinancialSummaryResponse = TApiResponse<TFinancialSummaryData>;

export type TWorkingCapitalPeriod =
  | "last7days"
  | "thisMonth"
  | "lastMonth"
  | "last3Months"
  | "last6Months"
  | "last12Months"
  | string;

export type TWorkingCapitalRow = {
  month: string;
  income: number;
  expense: number;
  net: number;
};

export type TWorkingCapitalSummary = {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
};

export type TWorkingCapitalData = {
  period: TWorkingCapitalPeriod;
  currency: TCurrencyCode;
  data: TWorkingCapitalRow[];
  summary: TWorkingCapitalSummary;
};

export type TWorkingCapitalResponse = TApiResponse<TWorkingCapitalData>;

export type TRecentTransaction = {
  id: string;
  name: string;
  business: string;
  image: string;
  type: string;
  amount: number;
  currency: TCurrencyCode;
  date: string;
  status: TStatus;
};

export type TRecentTransactionsSummary = {
  totalIncome: number;
  totalExpense: number;
  count: number;
};

export type TRecentTransactionsData = {
  transactions: TRecentTransaction[];
  summary: TRecentTransactionsSummary;
};

export type TRecentTransactionsResponse = TApiResponse<TRecentTransactionsData>;

export type TCardType = "credit" | "debit" | "virtual" | string;
export type TCardNetwork = "Visa" | "Mastercard" | "Amex" | string;

export type TWalletCard = {
  id: string;
  name: string;
  type: TCardType;
  cardNumber: string;
  bank: string;
  network: TCardNetwork;
  expiryMonth: number;
  expiryYear: number;
  color: string;
  isDefault: boolean;
};

export type TWalletData = {
  cards: TWalletCard[];
};

export type TWalletResponse = TApiResponse<TWalletData>;

export type TScheduledTransfer = {
  id: string;
  name: string;
  image: string;
  date: string;
  amount: number;
  currency: TCurrencyCode;
  status: "scheduled" | TStatus;
};

export type TScheduledTransfersSummary = {
  totalScheduledAmount: number;
  count: number;
};

export type TScheduledTransfersData = {
  transfers: TScheduledTransfer[];
  summary: TScheduledTransfersSummary;
};

export type TScheduledTransfersResponse = TApiResponse<TScheduledTransfersData>;

export type TTokenMissingError = TApiErrorResponse & {
  error: "Unauthorized";
  code: "TOKEN_MISSING";
};
