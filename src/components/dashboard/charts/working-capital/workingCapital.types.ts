export type TWorkingCapitalPoint = {
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

export type TWorkingCapitalView = {
  currency: string;
  points: TWorkingCapitalPoint[];
  summary?: TWorkingCapitalSummary;
};
