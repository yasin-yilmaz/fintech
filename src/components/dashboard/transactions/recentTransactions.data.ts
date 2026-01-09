import type { TRecentTransactionRow } from "./recentTransactions.types";

export const RECENT_TRANSACTIONS: TRecentTransactionRow[] = [
  {
    id: "t1",
    title: "Iphone 13 Pro MAX",
    business: "Apple. Inc",
    type: "Mobile",
    amount: 420.84,
    date: "14 Apr 2022",
    logo: {
      type: "image",
      src: "/images/brand/iphone2.png",
      alt: "Apple",
    },
  },
  {
    id: "t2",
    title: "Netflix Subscription",
    business: "Netflix",
    type: "Entertainment",
    amount: 100,
    date: "05 Apr 2022",
    logo: {
      type: "image",
      src: "/images/brand/netflix.png",
      alt: "Netflix",
    },
  },
  {
    id: "t3",
    title: "Figma Subscription",
    business: "Figma. Inc",
    type: "Software",
    amount: 244.2,
    date: "02 Apr 2022",
    logo: {
      type: "image",
      src: "/images/brand/figma.png",
      alt: "Figma",
    },
  },
];
