import React from "react";

interface PainCard {
  pain: string;
  detail: string;
  fix: string;
  code: string;
}

const pains: PainCard[] = [
  {
    pain: "Manual deploy loop",
    detail:
      "TS-compile, copy to com.mojang, reload the world, repeat. Forever.",
    fix: "bedrock-build deploy --watch rebuilds and re-syncs on save.",
    code: "bedrock-build deploy --watch",
  },
  {
    pain: "No manual zipping",
    detail:
      "Packaging an addon meant hand-zipping folders and praying the structure was right.",
    fix: "bedrock-build pack produces a clean .mcaddon in one command.",
    code: "bedrock-build pack",
  },
];

const PainPointsSection: React.FC = () => (
  <section className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16">
    <div className="text-center mb-12">
      <p className="font-code text-xs uppercase tracking-[0.2em] text-secondary">
        {"// pain"}
      </p>
      <h2 className="mt-3 font-header text-3xl md:text-4xl font-bold tracking-tight text-dark">
        Leave us the lazy setup work, focus on building.
      </h2>
      <p className="mt-3 text-gray max-w-2xl mx-auto">
        Spend your time creating, not setting up. All the essentials are
        handled for you, so you can jump straight into development.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {pains.map((p) => (
        <div
          key={p.pain}
          className="group relative rounded-xl border border-lightgray bg-lightgray/60 p-6 hover:border-secondary/40 transition"
        >
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/80 text-light text-xs font-bold">
              !
            </span>
            <h3 className="font-header text-lg md:text-xl font-semibold text-dark">
              {p.pain}
            </h3>
          </div>
          <p className="mt-2 text-sm text-gray leading-relaxed">
            {p.detail}
          </p>
          <div className="mt-5 border-t border-lightgray pt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/20 text-secondary text-xs font-bold">
                {"✓"}
              </span>
              <span className="text-sm font-medium text-secondary">
                How we fix it
              </span>
            </div>
            <p className="text-sm text-darkgray mb-3">{p.fix}</p>
            <pre className="overflow-x-auto rounded-md bg-light/60 border border-lightgray px-3 py-2 text-xs text-dark font-code">
              {p.code}
            </pre>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PainPointsSection;
