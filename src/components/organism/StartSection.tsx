import React from "react";
import Image from "next/image";
import ShieldsBadge from "@/components/atoms/ShieldsBadge";

const BADGES = [
  {
    alt: "Version",
    src: "https://img.shields.io/badge/version-1.3.0-blue.svg",
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

const StartSection: React.FC = () => (
  <section className="max-w-4xl mx-auto">
    <div className="flex flex-wrap gap-2 justify-center mt-2">
      <p className="text-xl md:text-2xl font-bold mb-6 text-center">
        The Fastest Way to Start Minecraft Bedrock Addon Development! 🚀
      </p>
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
  </section>
);

export default StartSection;
