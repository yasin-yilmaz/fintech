export type TRecentTransactionLogo =
  | {
      type: "image";
      src: string;
      alt?: string;
    }
  | {
      type: "fallback";
      letter: string;
    };

export type TRecentTransactionRow = {
  id: string;
  title: string;
  business: string;
  type: string;
  amount: number;
  date: string;
  logo: TRecentTransactionLogo;
};
