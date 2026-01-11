"use client";

import { useState } from "react";

import Image, { type ImageProps } from "next/image";

import { normalizeSrc } from "@/lib/utils";

type Props = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
};

export const BrandLogo = ({
  src,
  alt,
  fallbackSrc = "/images/brand/brand-placeholder.png",
  ...props
}: Props) => {
  const [hasError, setHasError] = useState(false);

  const resolvedSrc = normalizeSrc(src, fallbackSrc);

  return (
    <Image
      key={resolvedSrc}
      {...props}
      src={hasError ? fallbackSrc : resolvedSrc}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
};
