import React from "react";

interface Path {
  title: string;
  recommended?: boolean;
  icon: React.ReactNode;
  description: string;
  bestFor: string;
}

const paths: Path[] = [
  {
    title: "keyyard/bedrock-build",
    recommended: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12 2 4 7l8 5 8-5-8-5Z" />
        <path d="m4 12 8 5 8-5" />
        <path d="m4 17 8 5 8-5" />
      </svg>
    ),
    description:
      "Full-featured workspace with our compiler. Pick this if you want hot reload, .mcaddon packaging, and TypeScript out of the box.",
    bestFor: "Best for: shipping serious add-ons fast.",
  },
  {
    title: "Microsoft Samples",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 22h8" />
        <path d="M12 18v4" />
        <path d="m7 10 3 2-3 2" />
        <path d="M13 14h4" />
      </svg>
    ),
    description:
      "Official Microsoft scripting samples, unmodified. Pick this if you're following an MS tutorial verbatim.",
    bestFor: "Best for: learning the raw API the way Microsoft demos it.",
  },
  {
    title: "Community Templates",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 21c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M14 21c0-2.2 1.8-4 4-4s4 1.8 4 4" />
      </svg>
    ),
    description:
      "Curated starters contributed by the community. Pick this for specialized starters like custom items, entities, or minigames.",
    bestFor: "Best for: niche projects with a head start.",
  },
];

const ChoosePathSection: React.FC = () => (
  <section className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
    <div className="text-center mb-12">
      <p className="font-code text-xs uppercase tracking-[0.2em] text-emerald-400">
        {"// paths"}
      </p>
      <h2 className="mt-3 font-header text-3xl md:text-4xl font-bold tracking-tight text-white">
        One CLI, three starting points
      </h2>
      <p className="mt-3 text-zinc-300 max-w-2xl mx-auto">
        Pick the source that matches your goal. You can always switch later.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
      {paths.map((p) => (
        <div
          key={p.title}
          className={`relative flex flex-col rounded-xl p-6 transition ${
            p.recommended
              ? "border-2 border-emerald-500 bg-zinc-900 shadow-[0_0_0_1px_rgba(16,185,129,0.25)] md:scale-[1.03]"
              : "border border-zinc-800 bg-zinc-900/60 hover:border-emerald-500/30"
          }`}
        >
          {p.recommended && (
            <span className="absolute -top-3 right-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-950">
              Recommended
            </span>
          )}
          <div
            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
              p.recommended
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-zinc-950 text-emerald-400"
            }`}
          >
            {p.icon}
          </div>
          <h3
            className={`mt-4 text-xl text-white ${
              p.recommended ? "font-code font-medium" : "font-header font-semibold"
            }`}
          >
            {p.title}
          </h3>
          <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
            {p.description}
          </p>
          <p className="mt-4 text-xs font-medium text-emerald-400">
            {p.bestFor}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default ChoosePathSection;
