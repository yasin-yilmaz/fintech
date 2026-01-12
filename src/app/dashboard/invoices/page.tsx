import { Metadata } from "next";

import { pageMetadata } from "@/lib/metadata";

import { NotReady } from "@/components/ui/NotReady";

export const metadata: Metadata = pageMetadata({
  title: "Invoices",
  description: "Transactions page is under construction.",
  canonical: "/dashboard/invoices",
  robots: { index: false, follow: false },
  openGraph: {
    url: "/dashboard/invoices",
    title: "Invoices",
  },
  twitter: {
    title: "Invoices",
  },
});

const InvoicesPage = () => {
  return <NotReady title="Invoices" />;
};

export default InvoicesPage;
