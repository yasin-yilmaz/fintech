import { Metadata } from "next";

import { pageMetadata } from "@/lib/metadata";

import { NotReady } from "@/components/ui/NotReady";

export const metadata: Metadata = pageMetadata({
  title: "My Wallets",
  description: "Transactions page is under construction.",
  canonical: "/dashboard/wallets",
  robots: { index: false, follow: false },
  openGraph: {
    url: "/dashboard/wallets",
    title: "My Wallets",
  },
  twitter: {
    title: "My Wallets",
  },
});

const WalletPage = () => {
  return <NotReady title="My Wallets" />;
};

export default WalletPage;
