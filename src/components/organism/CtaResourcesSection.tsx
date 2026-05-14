import React from "react";
import CopyBlock from "../atoms/CopyBlock";

interface Resource {
  label: string;
  href: string;
  external?: boolean;
}

const resources: Resource[] = [
  { label: "Get Started", href: "/docs/getting-started" },
  { label: "Docs", href: "/docs" },
  {
    label: "GitHub",
    href: "https://github.com/keyyard/create-mc-bedrock-cli",
    external: true,
  },
  {
    label: "Discord",
    href: "https://discord.gg/EJ4swPKJNU",
    external: true,
  }
];

const CtaResourcesSection: React.FC = () => (
  <section className="w-full max-w-5xl mx-auto px-4 py-12 md:py-16">
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 md:p-12 text-center">
      <h2 className="font-header text-3xl md:text-4xl font-bold text-white">
        Ready to ship your add-on?
      </h2>
      <p className="mt-3 text-gray-200 max-w-xl mx-auto">
        One command to scaffold, one command to deploy, one command to pack.
        That&apos;s the whole pitch.
      </p>

      <div className="mt-8 mx-auto max-w-md text-left">
        <CopyBlock code="npx create-mc-bedrock" />
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="/docs/getting-started"
          className="group inline-flex items-center justify-center w-full sm:w-auto px-7 py-3 rounded-full bg-emerald-500 hover:bg-emerald-500/80 text-emerald-950 font-bold text-base transition"
        >
          Get Started
          <span className="ml-2 text-emerald-950 transition" aria-hidden="true">→</span>
        </a>
        <a
          href="/docs"
          className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3 rounded-full border border-emerald-500/50 bg-zinc-900/40 hover:bg-emerald-500/15 text-white font-semibold text-base backdrop-blur-sm transition"
        >
          Read the docs
        </a>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        {resources.map((r, i) => (
          <React.Fragment key={r.label}>
            {i > 0 && (
              <span className="text-zinc-300" aria-hidden="true">
                •
              </span>
            )}
            <a
              href={r.href}
              {...(r.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-gray-200 hover:text-emerald-400 transition font-medium"
            >
              {r.label}
            </a>
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

export default CtaResourcesSection;
