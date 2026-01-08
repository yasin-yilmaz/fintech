import type { Metadata } from "next";

export const appMetadata: Metadata = {
  metadataBase: new URL("https://fintech.com"),
  title: {
    default: "Fintech",
    template: "%s | Fintech",
  },
  description:
    "Fintech ile finans yönetimini kolaylaştırın. Güvenli giriş, hızlı kayıt ve kişisel dashboard ile işlemlerinizi tek yerden yönetin.",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://fintech.com",
    siteName: "Fintech",
    title: "Fintech",
    description:
      "Güvenli ve modern bir finans deneyimi: Sign in / Sign up ve kişisel dashboard.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Fintech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fintech",
    description:
      "Güvenli ve modern bir finans deneyimi: Sign in / Sign up ve kişisel dashboard.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};
