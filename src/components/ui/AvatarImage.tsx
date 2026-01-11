"use client";

import * as React from "react";

import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
};

export const AvatarImage = ({
  src,
  alt,
  fallbackSrc = "/images/users/avatar-placeholder.png",
  ...props
}: Props) => {
  const [currentSrc, setCurrentSrc] = React.useState(
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
