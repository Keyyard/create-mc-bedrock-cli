import React from "react";
import { showcase, type ShowcaseTag } from "@/data/showcase";

const tagStyles: Record<ShowcaseTag, string> = {
  Marketplace:
    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25",
  CurseForge:
    "bg-orange-400/15 text-orange-200 border border-orange-400/30 hover:bg-orange-400/25",
  GitHub:
    "bg-zinc-700/15 text-gray-200 border border-zinc-700/30 hover:bg-zinc-700/25",
};

interface CardImageProps {
  src: string;
  alt: string;
}

const CardImage: React.FC<CardImageProps> = ({ src, alt }) => {
  const [errored, setErrored] = React.useState(false);

  if (errored || !src) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-zinc-900 flex items-center justify-center">
        <span className="text-emerald-400 font-code text-xs uppercase tracking-wider">
          {alt || "No preview"}
        </span>
      </div>
    );
  }

  // Use native img to avoid Next/Image domain config issues with external URLs
  // and to keep the fallback simple under static export.
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-zinc-950/40">
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
      <h2 className="mt-2 font-header text-3xl md:text-4xl font-bold text-white">
        Shipped with Bedrock CLI
      </h2>
      <p className="mt-3 text-zinc-300 max-w-2xl mx-auto">
        Real projects built and packaged with the toolchain. Want yours
        here? Open a PR.
      </p>
    </div>

    {showcase.length === 0 ? (
      <div className="text-center text-zinc-300 py-12">
        Showcase entries coming soon.
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {showcase.map((entry) => (
          <div
            key={entry.url}
            className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden hover:border-emerald-500/40 transition"
          >
            <CardImage src={entry.image} alt={entry.name} />
            <div className="flex items-center justify-between p-4 gap-3">
              <h3 className="font-header font-semibold text-white text-sm md:text-base line-clamp-2">
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
