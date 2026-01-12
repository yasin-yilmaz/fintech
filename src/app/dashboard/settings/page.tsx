import { Metadata } from "next";

import { pageMetadata } from "@/lib/metadata";

import { NotReady } from "@/components/ui/NotReady";

export const metadata: Metadata = pageMetadata({
  title: "Settings",
  description: "Transactions page is under construction.",
  canonical: "/dashboard/settings",
  robots: { index: false, follow: false },
  openGraph: {
    url: "/dashboard/wallets",
    title: "Settings",
  },
  twitter: {
    title: "Settings",
  },
});

const SettingsPage = () => {
  return <NotReady title="Settings" />;
};

export default SettingsPage;
