import { faker } from "@faker-js/faker";

export type TWorkingCapitalPoint = {
  date: string; // YYYY-MM-DD
  income: number;
  expenses: number;
};

type Options = {
  days?: number; // default 365
  seed?: number; // default 2026
  endDate?: Date; // default today
};

export const genWorkingCapitalData = ({
  days = 365,
  seed = 2026,
  endDate = new Date(),
}: Options = {}): TWorkingCapitalPoint[] => {
  faker.seed(seed);

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  const start = new Date(end);
  start.setDate(start.getDate() - (days - 1));

  // Basit baz değerler
  let incomeBase = 5200;
  let expenseBase = 4800;

  const data: TWorkingCapitalPoint[] = [];

  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    const date = d.toISOString().slice(0, 10);

    // Hafif drift (çok küçük)
    incomeBase += faker.number.int({ min: -25, max: 25 });
    expenseBase += faker.number.int({ min: -25, max: 25 });

    // Günlük dalgalanma
    const income = Math.max(
      0,
      incomeBase + faker.number.int({ min: -600, max: 600 }),
    );
    const expenses = Math.max(
      0,
      expenseBase + faker.number.int({ min: -600, max: 600 }),
    );

    data.push({
      date,
      income: Math.round(income),
      expenses: Math.round(expenses),
    });
  }

  return data;
};

export const WORKING_CAPITAL_DATA = genWorkingCapitalData();
