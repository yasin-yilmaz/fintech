import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description?: string;
  canonical?: string;

  robots?: Metadata["robots"];
  openGraph?: Partial<NonNullable<Metadata["openGraph"]>>;
  twitter?: Partial<NonNullable<Metadata["twitter"]>>;
};

export const appMetadata: Metadata = {
  metadataBase: new URL("https://fintech-case-demo.netlify.app"),
  title: {
    default: "Fintech",
    template: "%s | Fintech",
  },
  description:
    "Fintech is a demo application built to showcase a modern financial dashboard experience.",
  applicationName: "Fintech",
  keywords: [
    "fintech",
    "finance",
    "banking",
    "payments",
    "dashboard",
    "secure login",
  ],
  authors: [{ name: "Fintech" }],
  creator: "Fintech",
  publisher: "Fintech",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://fintech-case-demo.netlify.app",
    siteName: "Fintech",
    title: "Fintech",
    description:
      "Fintech is a demo application built to showcase a modern financial dashboard experience.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Fintech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fintech",
    description:
      "Fintech is a demo application built to showcase a modern financial dashboard experience.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  robots: { index: true, follow: true },
};

const getBaseTitleConfig = (base: Metadata["title"]) => {
  if (base && typeof base === "object") return base;
  return { default: "Fintech", template: "%s | Fintech" };
};

const asString = (v: unknown): string | undefined =>
  typeof v === "string" ? v : undefined;

export const pageMetadata = ({
  title,
  description,
  canonical,
  robots,
  openGraph,
  twitter,
}: PageMetadataInput): Metadata => {
  const baseTitle = getBaseTitleConfig(appMetadata.title);
  const baseDescription = appMetadata.description ?? "";

  const finalDescription = description ?? baseDescription;

  const baseOg = appMetadata.openGraph ?? {};
  const baseTw = appMetadata.twitter ?? {};

  const baseOgDesc =
    asString((baseOg as { description?: unknown }).description) ??
    baseDescription;
  const baseTwDesc =
    asString((baseTw as { description?: unknown }).description) ??
    baseDescription;

  return {
    ...appMetadata,

    title: { ...baseTitle, default: title },

    description: finalDescription,

    alternates: {
      ...(appMetadata.alternates ?? {}),
      canonical: canonical ?? appMetadata.alternates?.canonical,
    },

    robots: robots ?? appMetadata.robots,

    openGraph: {
      ...baseOg,
      title,
      description: description ?? baseOgDesc,
      ...(openGraph ?? {}),
    },

    twitter: {
      ...baseTw,
      title,
      description: description ?? baseTwDesc,
      ...(twitter ?? {}),
    },
  };
};
