"use client";
import type { ImageLoaderProps } from "next/image";

// Static-export compatible: Netlify resizes and negotiates WebP/AVIF at the edge.
// Width only preserves the original aspect ratio and existing CSS crops.
export default function netlifyImageLoader({ src, width, quality }: ImageLoaderProps) {
  if (process.env.NODE_ENV === "development") return src;
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 80}&fit=contain`;
}
