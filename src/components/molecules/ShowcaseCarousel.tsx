import React from "react";
import Image from "next/image";

const images = [
  {
    src: "/medias/gif.gif",
    alt: "Create MC Bedrock CLI in action",
  },
  {
    src: "/medias/img1.png",
    alt: "Create MC Bedrock CLI screenshot 1",
  }
];

export default function ShowcaseCarousel() {
  const [current, setCurrent] = React.useState(0);
  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-2xl aspect-video overflow-hidden rounded-lg shadow-lg">
        <Image
          src={images[current].src}
          alt={images[current].alt}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, 600px"
        />
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/50 rounded-full p-2"
          onClick={prev}
          aria-label="Previous image"
        >
          ◀
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/50 rounded-full p-2"
          onClick={next}
          aria-label="Next image"
        >
          ▶
        </button>
      </div>
      <div className="flex gap-2 mt-2">
        {images.map((img, idx) => (
          <button
            key={img.src}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to image ${idx + 1}`}
            className="inline-flex items-center justify-center p-2 w-11 h-11 rounded-full focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            {/* visual dot stays small while touch target is large */}
            <span className={`block w-3 h-3 rounded-full ${idx === current ? "bg-emerald-500" : "bg-gray-300"}`} aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
