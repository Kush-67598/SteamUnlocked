// components/SafeImage.js
import { useEffect, useState } from "react";

export default function SafeImage({ img, alt = "", ...props }) {
  const [src, setSrc] = useState(`/images/${img}.webp`);

  useEffect(() => {
    const testImg = new Image();
    testImg.src = `/images/${img}.webp`;
    testImg.onload = () => setSrc(`/images/${img}.webp`);
    testImg.onerror = () => setSrc(`/images/${img}.jpg`);
  }, [img]);

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      loading="lazy"
      className="w-44 h-60 cursor-pointer rounded-lg"
    />
  );
}
