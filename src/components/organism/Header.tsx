import CopyBlock from "../atoms/CopyBlock";
import Image from "next/image";
import ShieldsBadge from "@/components/atoms/ShieldsBadge";

const BADGES = [
  {
    alt: "Version",
    src: "https://img.shields.io/badge/version-1.4.0-blue.svg",
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
  <header className="flex flex-col items-center text-center w-full min-h-[60vh] bg-emerald-900/30 relative overflow-hidden" id="start">
    <Image
      src="/bg.webp"
      alt="Keyyard BedrockCLI bg"
      fill
      style={{ mixBlendMode: "overlay" }}
      className="object-cover object-center opacity-40 pointer-events-none select-none z-0"
      priority
    />
    <div className="flex flex-col items-center justify-center h-full py-16 z-10 relative">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white drop-shadow-lg">
        Create MC Bedrock CLI
      </h1>
      <p className="text-md font-semibold text-gray-100 mb-2">
        The Fastest Way to Start Minecraft Bedrock Addon Development
      </p>
      <p className="text-base text-gray-200 mb-8 max-w-2xl">
        Tired of manually setting up Minecraft Bedrock workspaces?<br />
        With <span className="font-semibold">create-mc-bedrock</span>, you can bootstrap your next project in seconds, using official Microsoft samples and fresh manifest UUIDs every time.
      </p>
      <a
        href="#requirements"
        className="inline-block w-[300px] py-4 mb-6 rounded-full bg-emerald-800 text-white text-xl font-bold shadow-lg hover:bg-emerald-700 transition min-w-[260px]"
        style={{ color: "white" }}
      >
        Get Started
      </a>
      <div className="mb-8 flex text-left">
        <div className="inline-block w-[300px]">
          <CopyBlock code="npx create-mc-bedrock" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {BADGES.map((badge) => (
          <ShieldsBadge key={badge.alt} {...badge} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        <a
          href="https://github.com/keyyard/create-mc-bedrock-cli"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Image
            src="https://img.shields.io/github/stars/keyyard/create-mc-bedrock-cli"
            alt="GitHub Stars"
            className="inline"
            width={100}
            height={50}
          />
        </a>
      </div>
    </div>
  </header>
);

export default Header;