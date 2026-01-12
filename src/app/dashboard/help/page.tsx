import { Metadata } from "next";

import { pageMetadata } from "@/lib/metadata";

import { NotReady } from "@/components/ui/NotReady";

export const metadata: Metadata = pageMetadata({
  title: "Help",
  description: "Transactions page is under construction.",
  canonical: "/dashboard/help",
  robots: { index: false, follow: false },
  openGraph: {
    url: "/dashboard/help",
    title: "help",
  },
  twitter: {
    title: "Help",
  },
});

const HelpPage = () => {
  return <NotReady title="Help" />;
};

export default HelpPage;
