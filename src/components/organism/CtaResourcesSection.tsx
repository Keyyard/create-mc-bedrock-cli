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
  },
  {
    label: "create-mc-bedrock on npm",
    href: "https://www.npmjs.com/package/create-mc-bedrock",
    external: true,
  },
  {
    label: "@keyyard/bedrock-build on npm",
    href: "https://www.npmjs.com/package/@keyyard/bedrock-build",
    external: true,
  },
];

const CtaResourcesSection: React.FC = () => (
  <section className="w-full max-w-5xl mx-auto px-4 py-12 md:py-16">
    <div className="relative overflow-hidden rounded-2xl border border-lightgray bg-lightgray/70 p-8 md:p-12 text-center">
      <h2 className="font-header text-3xl md:text-4xl font-bold text-dark">
        Ready to ship your add-on?
      </h2>
      <p className="mt-3 text-darkgray max-w-xl mx-auto">
        One command to scaffold, one command to deploy, one command to pack.
        That&apos;s the whole pitch.
      </p>

      <div className="mt-8 mx-auto max-w-md text-left">
        <CopyBlock code="npx create-mc-bedrock" />
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="/docs/getting-started"
          className="group inline-flex items-center justify-center w-full sm:w-auto px-7 py-3 rounded-full bg-secondary hover:bg-secondary/80 text-light font-bold text-base transition"
        >
          Get Started
          <span className="ml-2 text-light transition" aria-hidden="true">→</span>
        </a>
        <a
          href="/docs"
          className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3 rounded-full border border-secondary/50 bg-highlight hover:bg-secondary/15 text-dark font-semibold text-base backdrop-blur-sm transition"
        >
          Read the docs
        </a>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        {resources.map((r, i) => (
          <React.Fragment key={r.label}>
            {i > 0 && (
              <span className="text-gray" aria-hidden="true">
                •
              </span>
            )}
            <a
              href={r.href}
              {...(r.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-darkgray hover:text-secondary transition font-medium"
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
