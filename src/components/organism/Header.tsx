import CopyBlock from "../atoms/CopyBlock";
import ShieldsBadge from "@/components/atoms/ShieldsBadge";
import { CLI_VERSION } from "@/data/version";

const BADGES = [
  {
    alt: "npm: create-mc-bedrock",
    src: "https://img.shields.io/npm/v/create-mc-bedrock?label=create-mc-bedrock&color=cb3837&logo=npm",
    href: "https://www.npmjs.com/package/create-mc-bedrock",
  },
  {
    alt: "npm: @keyyard/bedrock-build",
    src: "https://img.shields.io/npm/v/@keyyard/bedrock-build?label=%40keyyard%2Fbedrock-build&color=cb3837&logo=npm",
    href: "https://www.npmjs.com/package/@keyyard/bedrock-build",
  },
  {
    alt: "Version",
    src: `https://img.shields.io/badge/version-${CLI_VERSION}-blue.svg`,
    href: "https://github.com/keyyard/create-mc-bedrock-cli",
  },
  {
    alt: "Node.js",
    src: "https://img.shields.io/badge/Node.js-18%2B-green.svg",
    href: "https://nodejs.org/",
  },
  {
    alt: "License",
    src: "https://img.shields.io/badge/license-MIT-orange.svg",
    href: "https://github.com/Keyyard/create-mc-bedrock-cli/blob/main/LICENSE",
  },
];

const Header: React.FC = () => (
  <header
    id="start"
    className="relative flex flex-col items-center text-center w-full overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-lightgray"
  >
    {/* Sage-tinted hero base */}
    <div
      className="absolute inset-0 -z-20 pointer-events-none bg-light"
      aria-hidden
    />
    <div
      className="absolute inset-0 -z-20 pointer-events-none bg-secondary/10"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at top, rgb(var(--secondary)), transparent 55%)",
        opacity: 0.18,
      }}
      aria-hidden
    />
    {/* Dot grid background pattern. */}
    <div
      className="absolute inset-0 -z-10 pointer-events-none opacity-[0.08]"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgb(var(--secondary)) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
      aria-hidden
    />

    <div className="relative flex flex-col items-center w-full max-w-4xl px-4">
      <h1 className="mt-8 font-header text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-dark leading-[1.05]">
        Skip the lazy part,
        <br />
        work hard and{" "}
        <span className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-clip-text text-transparent">
          smart.
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-base md:text-lg text-gray">
        The fastest way to bootstrap, build, and ship Minecraft Bedrock
        add-ons.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <a
          href="/docs/getting-started"
          className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3 rounded-full bg-secondary hover:bg-secondary/80 text-light font-bold text-base transition"
        >
          Get Started
        </a>
        <a
          href="/docs"
          className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3 rounded-full border border-secondary/50 bg-highlight hover:bg-secondary/15 text-dark font-semibold text-base backdrop-blur-sm transition"
        >
          Read the docs
        </a>
      </div>

      <div className="mt-8 w-full max-w-md text-left">
        <CopyBlock code="npx create-mc-bedrock" />
        <p className="mt-3 text-sm text-gray">
          Run in your terminal after installing{" "}
          <a
            href="https://nodejs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-tertiary underline underline-offset-2"
          >
            Node.js
          </a>.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2 justify-center opacity-80">
        {BADGES.map((badge) => (
          <ShieldsBadge key={badge.alt} {...badge} />
        ))}
      </div>
    </div>
  </header>
);

export default Header;
