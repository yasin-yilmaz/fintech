import type {
  TWorkingCapitalPoint,
  TWorkingCapitalSummary,
  TWorkingCapitalView,
} from "./workingCapital.types";

type ApiPoint = {
  month: string;
  income: number;
  expense: number;
  net: number;
};

type ApiSummary = {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
};

export const toWorkingCapitalView = (args: {
  currency: string;
  data: ApiPoint[];
  summary?: ApiSummary;
}): TWorkingCapitalView => {
  const points: TWorkingCapitalPoint[] = (args.data ?? []).map((p) => ({
    month: String(p.month ?? ""),
    income: Number(p.income ?? 0),
    expense: Number(p.expense ?? 0),
    net: Number(p.net ?? 0),
  }));

  const summary: TWorkingCapitalSummary | undefined = args.summary
    ? {
        totalIncome: Number(args.summary.totalIncome ?? 0),
        totalExpense: Number(args.summary.totalExpense ?? 0),
        netBalance: Number(args.summary.netBalance ?? 0),
      }
    : undefined;

  return {
    currency: String(args.currency ?? ""),
    points,
    summary,
  };
};
