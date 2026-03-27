"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackGradient?: string;
}

export default function FallbackImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
  fallbackGradient,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (fallbackGradient) {
      return (
        <div
          className={className}
          style={{
            background: fallbackGradient,
            position: fill ? "absolute" : "relative",
            inset: fill ? 0 : undefined,
            width: width,
            height: height,
          }}
        />
      );
    }
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
