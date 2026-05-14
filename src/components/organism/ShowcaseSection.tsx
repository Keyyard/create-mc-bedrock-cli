import React from "react";
import { showcase, type ShowcaseTag } from "@/data/showcase";

const tagStyles: Record<ShowcaseTag, string> = {
  Marketplace:
    "bg-emerald-400/15 text-emerald-200 border border-emerald-400/30 hover:bg-emerald-400/25",
  CurseForge:
    "bg-orange-400/15 text-orange-200 border border-orange-400/30 hover:bg-orange-400/25",
  GitHub:
    "bg-gray-400/15 text-gray-200 border border-gray-400/30 hover:bg-gray-400/25",
};

interface CardImageProps {
  src: string;
  alt: string;
}

const CardImage: React.FC<CardImageProps> = ({ src, alt }) => {
  const [errored, setErrored] = React.useState(false);

  if (errored || !src) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-emerald-900 flex items-center justify-center">
        <span className="text-emerald-200 font-mono text-xs uppercase tracking-wider">
          {alt || "No preview"}
        </span>
      </div>
    );
  }

  // Use native img to avoid Next/Image domain config issues with external URLs
  // and to keep the fallback simple under static export.
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-black/40">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setErrored(true)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
};

const ShowcaseSection: React.FC = () => (
  <section
    id="showcase"
    className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24 scroll-mt-24"
  >
    <div className="text-center mb-12">
      <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">
        Showcase
      </p>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">
        Shipped with Bedrock CLI
      </h2>
      <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
        Real projects built and packaged with the toolchain. Want yours
        here? Open a PR.
      </p>
    </div>

    {showcase.length === 0 ? (
      <div className="text-center text-gray-500 py-12">
        Showcase entries coming soon.
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {showcase.map((entry) => (
          <div
            key={entry.url}
            className="group flex flex-col rounded-xl border border-emerald-900/40 bg-black/30 overflow-hidden hover:border-emerald-500/40 transition"
          >
            <CardImage src={entry.image} alt={entry.name} />
            <div className="flex items-center justify-between p-4 gap-3">
              <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2">
                {entry.name}
              </h3>
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition ${tagStyles[entry.tag]}`}
              >
                {entry.tag}
              </a>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

export default ShowcaseSection;
