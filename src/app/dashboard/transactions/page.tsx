import { Metadata } from "next";

import { pageMetadata } from "@/lib/metadata";

import { NotReady } from "@/components/ui/NotReady";

export const metadata: Metadata = pageMetadata({
  title: "Transactions",
  description: "Transactions page is under construction.",
  canonical: "/dashboard/transactions",
  robots: { index: false, follow: false },
  openGraph: {
    url: "/dashboard/transactions",
    title: "Transactions",
  },
  twitter: {
    title: "Transactions",
  },
});

const TransactionsPage = () => {
  return <NotReady title="Transactions" />;
};

export default TransactionsPage;
