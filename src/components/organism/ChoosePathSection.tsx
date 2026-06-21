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
    title: "mct (Microsoft)",
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
      "The official toolchain. Best when you're learning the raw @minecraft API or following a Microsoft tutorial.",
    bestFor: "Best for: learning the official way.",
  },
  {
    title: "Bedrock CLI",
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
      "The approachable middle. Scaffold once, then create:weapon, create:block, create:entity wire every linked file for you. Grows from your first add-on to a shipped one.",
    bestFor: "Best for: building and shipping add-ons fast.",
  },
  {
    title: "Regolith",
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
        <path d="M4 7h16" />
        <path d="M7 12h10" />
        <path d="M10 17h4" />
        <path d="M12 3v2" />
        <path d="M12 19v2" />
      </svg>
    ),
    description:
      "Advanced filter pipelines for large multi-pack projects with custom transforms.",
    bestFor: "Best for: heavy pipelines at scale.",
  },
];

const ChoosePathSection: React.FC = () => (
  <section className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
    <div className="text-center mb-12">
      <p className="font-code text-xs uppercase tracking-[0.2em] text-emerald-400">
        {"// positioning"}
      </p>
      <h2 className="mt-3 font-header text-3xl md:text-4xl font-bold tracking-tight text-white">
        Where Bedrock CLI fits
      </h2>
      <p className="mt-3 text-zinc-300 max-w-2xl mx-auto">
        Three tools, three bands. mct teaches the official way, Regolith powers
        heavy pipelines, and Bedrock CLI is the approachable middle.
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
          <h3 className="mt-4 text-xl text-white font-header font-semibold">
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
