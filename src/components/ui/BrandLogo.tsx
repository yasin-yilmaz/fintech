"use client";

import * as React from "react";

import Image, { type ImageProps } from "next/image";

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
  const [currentSrc, setCurrentSrc] = React.useState<string>(
    src && src.trim().length > 0 ? src : fallbackSrc,
  );

  React.useEffect(() => {
    setCurrentSrc(src && src.trim().length > 0 ? src : fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => setCurrentSrc(fallbackSrc)}
    />
  );
};
