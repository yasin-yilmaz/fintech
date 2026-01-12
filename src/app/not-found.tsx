import { Metadata } from "next";

import { pageMetadata } from "@/lib/metadata";

import { NotReady } from "@/components/ui/NotReady";

export const metadata: Metadata = pageMetadata({
  title: "Page not found",
  description:
    "The page you’re looking for doesn’t exist or may have been moved.",
  robots: { index: false, follow: false },
  openGraph: { title: "Page not found" },
  twitter: { title: "Page not found" },
});

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <NotReady
        title="Page not found"
        description="The page you’re looking for doesn’t exist or may have been moved."
        actionHref="/dashboard"
        actionLabel="Back to Dashboard"
      />
    </div>
  );
}
