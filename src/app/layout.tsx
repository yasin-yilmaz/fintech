import { PropsWithChildren } from "react";

import type { Metadata } from "next";

import { kumbhSans } from "@/lib/fonts";
import { appMetadata } from "@/lib/metadata";

import "./globals.css";

export const metadata: Metadata = appMetadata;

type Props = PropsWithChildren;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="tr">
      <body className={`${kumbhSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
